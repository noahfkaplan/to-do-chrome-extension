import React from 'react';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import ListArea from './ListArea';
import ListService from '../api/Services/ListService'

const mockGetListItemsByListId = jest.fn();
jest.mock('../api/Services/ListService', () => {
  return jest.fn().mockImplementation(() => {
    return {GetListItemsByListId: mockGetListItemsByListId};
  });
});

describe("List Area", () => {
    afterEach(cleanup);
    beforeEach(() => {
        ListService.mockClear();
        mockGetListItemsByListId.mockClear();
    })

    it.only("renders correct number of text areas for one initial list item", async () => {
            mockGetListItemsByListId.mockImplementation((num) => {
                return([{"completed":false,"id":0,"listId":0,"text":"Default Item","url":"http://www.google.com"}])
            })
            const {queryAllByLabelText, debug} = render(<ListArea />);
            await wait(() => queryAllByLabelText("Default Item checkbox").length > 0);
            debug();
            const rows = queryAllByLabelText("Default Item checkbox");
            expect(rows.length).toBe(1);            
    });

    it.each([
        [0, []],
        [1, [{ id: 0, text: "default item", checked: false }]],
        [2, [{ id: 0, text: "default item", checked: false },{ id: 1, text: "default item", checked: false }]]])
        ("renders correct number of checkboxes for %p initial list items", (expectedRowCount, initialItems) => {
            const {queryAllByLabelText} = setup(initialItems);
            const rows = queryAllByLabelText("default item checkbox");
            expect(rows.length).toBe(expectedRowCount);            
    });

    it("opens the EditListItem menu when add button is clicked", async () => {
        const {queryAllByTitle, getByLabelText, getByText } = setup([]);
        const initialRows = queryAllByTitle("checkbox");
        expect(initialRows.length).toBe(0);

        const addButton = getByLabelText("add");
        fireEvent.click(addButton);

        getByText("Save");
    });

    it("removed list item when edit button is clicked, and delete selected", () => {
        const { getAllByLabelText, queryAllByTitle, getByText } = setup(
            [{ id: 0, text: "default item", checked: false },
            { id: 1, text: "default item2", checked: false }]
        );
        const initialRows = queryAllByTitle("checkbox");
        expect(initialRows.length).toBe(2)

        const editButton = getAllByLabelText("edit");
        fireEvent.click(editButton[0]);

        const deleteButton = getByText("Delete");
        fireEvent.click(deleteButton);

        const rows = queryAllByTitle("checkbox");
        expect(rows.length).toBe(1)

    });
});