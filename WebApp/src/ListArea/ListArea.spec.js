import React from 'react';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import ListArea from './ListArea';
import ListService from '../api/Services/ListService'

const mockGetListItemsByListId = jest.fn();
const mockDeleteListItemByItemId = jest.fn();
jest.mock('../api/Services/ListService', () => {
  return jest.fn().mockImplementation(() => {
    return {
        GetListItemsByListId: mockGetListItemsByListId,
        DeleteListItemByItemId: mockDeleteListItemByItemId,
    };
  });
});

describe("List Area", () => {
    afterEach(cleanup);
    beforeEach(() => {
        ListService.mockClear();
        mockGetListItemsByListId.mockClear();
        mockDeleteListItemByItemId.mockClear();
    })

    it.each([1, 2, 3])("renders correct number of text areas for %p initial list item", async (numItems) => {
        const defaultItems = []
        for(let i = 0; i < numItems; i++){
            defaultItems.push({"completed": false,"id": i,"listId": 0,"text": "Default Item","url": "http://www.google.com"})
        }
        mockGetListItemsByListId.mockImplementation((num) => {
            return defaultItems;
        })
        const {queryAllByLabelText} = render(<ListArea />);
        await wait(() => queryAllByLabelText("Default Item checkbox").length > 0);
        const rows = queryAllByLabelText("Default Item checkbox");
        expect(rows.length).toBe(numItems);            
    });

    it("opens the EditListItem menu when add button is clicked", async () => {
        mockGetListItemsByListId.mockImplementation((num) => {
            return [{"completed": false,"id": 1,"listId": 0,"text": "Default Item","url": "http://www.google.com"}];
        })
        const {queryAllByLabelText, getByLabelText, findByText, findByLabelText} = render(<ListArea />);
        await findByLabelText("Default Item checkbox");
        const rows = queryAllByLabelText("Default Item checkbox");
        expect(rows.length).toBe(1);

        const addButton = getByLabelText("add");
        fireEvent.click(addButton);

        await findByText("Save");
    });

    it("removed list item when edit button is clicked, and delete selected", async () => {
        const defaultItems = []
        for(let i = 0; i < 2; i++){
            defaultItems.push({"completed": false,"id": i,"listId": 0,"text": "Default Item","url": "http://www.google.com"})
        }
        mockGetListItemsByListId.mockImplementation((num) => {
            return defaultItems;
        });
        mockDeleteListItemByItemId.mockImplementation((id) => {
            defaultItems.pop();
            return new Promise(()=>{return});
        })

        const { getAllByLabelText, findByText } = render(<ListArea/>);
        await wait(() => expect(getAllByLabelText("Default Item checkbox").length).toBe(2));

        const editButton = getAllByLabelText("edit");
        fireEvent.click(editButton[0]);

        const deleteButton = await findByText("Delete");
        fireEvent.click(deleteButton);

        expect(mockDeleteListItemByItemId).toBeCalled();
        await wait(() => expect(getAllByLabelText("Default Item checkbox").length).toBe(1));
    });
});