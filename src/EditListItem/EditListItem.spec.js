import React from 'react';
import { render, cleanup, wait, fireEvent } from "@testing-library/react";
import EditListItem from './EditListItem';

const defaultItem = {
    id: -1, 
    text: "",
    checked: false,
    url: "",
}
const testItem = {
    id: 0,
    text: 'Default Text', 
    checked: true,
    url: 'http://www.google.com'
}

const renderEditListItem = (onSave, item) => {
    return render(<EditListItem onSave = {onSave} item = {item}/>);
};

describe("Edit List Item", () => {

    afterEach(cleanup)

    it("renders without crashing", () => {
        renderEditListItem(jest.fn(), testItem);
    });

    it("fills description with editted item's text", () => {
        const { getByLabelText, debug } = renderEditListItem(jest.fn(), testItem);
        const description = getByLabelText("editDescription");
        expect(description.querySelector("input").value).toBe(testItem.text);
    });

    it("fills url with editted item's url", () => {
        const { getByLabelText, debug } = renderEditListItem(jest.fn(), testItem);
        const url = getByLabelText("editUrl");
        expect(url.querySelector("input").value).toBe(testItem.url);
    });

    it("renders description with no value when null item passed in", () => {
        const { getByLabelText, debug } = renderEditListItem(jest.fn(), defaultItem);
        const description = getByLabelText("editDescription");
        expect(description.querySelector("input").value).toBe(defaultItem.text);
    });

    it("renders url with no value when null item passed in", () => {
        const { getByLabelText, debug } = renderEditListItem(jest.fn(), defaultItem);
        const url = getByLabelText("editUrl");
        expect(url.querySelector("input").value).toBe(defaultItem.url);
    })

    it("calls onSave with description and url when save button is clicked", () => {
        const onSave = jest.fn()
        const { getByText } = renderEditListItem(onSave, testItem);
        const saveButton = getByText("Save");
        fireEvent.click(saveButton)
        expect(onSave).toBeCalledWith(testItem.text, testItem.url);
    });
});