import React from "react"
import { render, cleanup, fireEvent, wait } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary"

describe("Error Boundary", () => {
    afterEach(cleanup);
    
    it("renders ErrorDisplay when Error thrown in child element", async () => {
        const { getByText } = render(
            <ErrorBoundary>
                <button onClick = {() => {throw new Error("test error")}}>test button</button>
            </ErrorBoundary>
        );
        
        const errorButton = getByText("test button");
        fireEvent.click(errorButton);
        
        await wait(() => getByText("Refresh"));
    });

    it("renders child element when no Error thrown in child element", () => {
        const { getByText } = render(
            <ErrorBoundary>
                <button>test button</button>
            </ErrorBoundary>
        );

        getByText("test button");
    });
});