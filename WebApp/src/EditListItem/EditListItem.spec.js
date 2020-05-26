import React from 'react';
import { render, cleanup, wait, fireEvent } from "@testing-library/react";
import EditListItem from './EditListItem';

const testItem = {
    id: 0,
    text: 'Default Text', 
    checked: true,
    url: 'http://www.google.com'
}

const renderEditListItem = (onSave, onDelete, item) => {
    return render(<EditListItem onSave = {onSave} onDelete = {onDelete} item = {item}/>);
};

describe("Edit List Item", () => {

    afterEach(cleanup)

    it("renders without crashing", () => {
        renderEditListItem(jest.fn(), jest.fn(), testItem);
    });

    it("fills description with edited item's text", () => {
        const { getByLabelText } = renderEditListItem(jest.fn(), jest.fn(), testItem);
        const description = getByLabelText("editDescription");
        expect(description.querySelector("input").value).toBe(testItem.text);
    });

    it("fills url with edited item's url", () => {
        const { getByLabelText } = renderEditListItem(jest.fn(), jest.fn(), testItem);
        const url = getByLabelText("editUrl");
        expect(url.querySelector("input").value).toBe(testItem.url);
    });

    it("renders description with no value when null item passed in", () => {
        const { getByLabelText } = renderEditListItem(jest.fn(), jest.fn(), null);
        const description = getByLabelText("editDescription");
        expect(description.querySelector("input").value).toBe('');
    });

    it("renders url with no value when null item passed in", () => {
        const { getByLabelText } = renderEditListItem(jest.fn(), jest.fn(), null);
        const url = getByLabelText("editUrl");
        expect(url.querySelector("input").value).toBe('');
    })

    it("renders save button and delete button when editting existing user", () => {
        const { getByText } = renderEditListItem(jest.fn(), jest.fn(), testItem);
        getByText("Save") //implicit assertion
        getByText("Delete") //implicit assertion
    });
    
    it("renders save button and not delete button when creating new user", () => {
        const { getByText, queryByText } = renderEditListItem(jest.fn(), jest.fn(), null)
        getByText("Save") //implicit assertion
        expect(queryByText("Delete")).toBeFalsy();
    })

    it("calls onDelete when Delete button is clicked", () => {
        const onDelete = jest.fn();
        const { getByText } = renderEditListItem(jest.fn(), onDelete, testItem);
        const deleteButton = getByText("Delete");
        fireEvent.click(deleteButton);
        expect(onDelete).toBeCalled();
    });

    it("calls onSave with description and url when the form is submitted", () => {
        const onSave = jest.fn();
        const { getByTestId } = renderEditListItem(onSave, jest.fn(), testItem);
        const form = getByTestId("edit-form");
        fireEvent.submit(form);
        expect(onSave).toBeCalledWith(testItem.text, testItem.url)
    })
});