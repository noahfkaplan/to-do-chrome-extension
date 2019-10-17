import React from "react";
import { render } from "@testing-library/react";
import ListArea from "./ListArea";

describe("List Area", () => {
    
    const setup = () => {
        return render(<ListArea/>);
    }

    it("renders without crashing", () => {
        setup();
    });
})