import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ListItem from "./ListItem";

const setup = (text, checked, onCheck, url) => {
    return render(
        <ListItem 
            checked={checked} 
            text={text}
            onCheckChange={onCheck}
            url={url}
        />
    );
};

describe("List Item", () =>{
    afterEach(cleanup);

    it("calls onCheck when checkbox clicked", () => {
        const onCheck = jest.fn();
        const text = "test text";
        const { getByLabelText } = setup(text, false, onCheck, "http://www.google.com");
        const checkbox = getByLabelText(text + " checkbox");
        fireEvent.click(checkbox);
        expect(onCheck).toBeCalled();
    });

    it("renders correct href for specified url on link component", () => {
        const onCheck = jest.fn();
        const text = "test text";
        const link = "http://www.google.com"
        const { getByText, debug } = setup(text, false, onCheck, link);

        debug();

        const itemDescription = getByText(text);
        
        expect(itemDescription.getAttribute("href").includes(link)).toBe(true);
    })

});