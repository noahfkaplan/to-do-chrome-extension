import React, {useState} from "react"
import { render, cleanup, fireEvent, wait, spyOn } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary"

describe("Error Boundary", () => {
    afterEach(cleanup);
    
    it("renders ErrorDisplay when Error thrown in child element", async () => {
        jest.spyOn(console, 'error');
        const { getByText } = render(
            <ErrorBoundary>
                <ComponentThrowsError />
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

        const testButton = getByText("test button");
        fireEvent.click(testButton);

        getByText("test button");

    });
});

const ComponentThrowsError = () => {
    const [error, setError] = useState(null)
    if(error){
        throw error;
    }
    return(
        <button onClick = {() => setError(new Error("Test Error"))}>
            test button    
        </button>
    );
}