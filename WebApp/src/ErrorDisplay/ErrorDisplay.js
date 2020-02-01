import React from 'react';

const ErrorDisplay = (props) => {
    return(       
        <div className = 'mainArea'>
            {props.error.message}
        </div>
    )
}

export default ErrorDisplay;
