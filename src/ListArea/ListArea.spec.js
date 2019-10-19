import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ListArea from './ListArea';

const setup = (initialListItems) => {
    return render(<ListArea initialListItems = {initialListItems}/>)
};

describe("List Area", () => {
    it.each([
        [0, []],
        [1, [{ id: 0, text: "default item", checked: false }]],
        [2, [{ id: 0, text: "default item", checked: false },{ id: 1, text: "default item", checked: false }]]])
        ("renders correct number of text areas for %p initial list items", (expectedRowCount, initialItems) => {
            const {queryAllByLabelText} = setup(initialItems);
            const rows = queryAllByLabelText("default item textarea");
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
});