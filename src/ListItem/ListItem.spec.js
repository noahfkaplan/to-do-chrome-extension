import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ListItem from "./ListItem";

const setup = (text, checked, onCheck, onTextChange) => {
    return render(
        <ListItem 
            checked={checked} 
            text={text}
            onCheckChange={onCheck}
            onTextChange={onTextChange}
        />
    );
};

describe("List Item", () =>{
    afterEach(cleanup);

    it("calls onCheck when checkbox clicked", () => {
        const onCheck = jest.fn();
        const onTextChange = jest.fn();
        const text = "test text";
        const { getByLabelText } = setup(text, false, onCheck, onTextChange);
        const checkbox = getByLabelText(text + " checkbox");
        fireEvent.click(checkbox);
        expect(onCheck).toBeCalled();
    });

});