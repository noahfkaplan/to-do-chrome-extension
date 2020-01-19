import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ListArea from './ListArea';

const setup = (initialListItems) => {
    return render(<ListArea initialListItems = {initialListItems}/>);
};

describe("List Area", () => {
    afterEach(cleanup);

    it.each([
        [0, []],
        [1, [{ id: 0, text: "default item", checked: false }]],
        [2, [{ id: 0, text: "default item", checked: false },{ id: 1, text: "default item", checked: false }]]])
        ("renders correct number of text areas for %p initial list items", (expectedRowCount, initialItems) => {
            const {queryAllByLabelText} = setup(initialItems);
            const rows = queryAllByLabelText("default item checkbox");
            expect(rows.length).toBe(expectedRowCount);            
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
        const {queryAllByTitle, getByLabelText, queryByText } = setup([]);
        const initialRows = queryAllByTitle("checkbox");
        expect(initialRows.length).toBe(0);

        const addButton = getByLabelText("add");
        fireEvent.click(addButton);

        const totalRows = queryByText("Save");
        expect(totalRows.length).toBe(1);
    });
});