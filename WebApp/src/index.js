import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ListArea from './ListArea';
import ErrorBoundary from './ErrorBoundary'

ReactDOM.render(
    <ErrorBoundary>
        <ListArea />
    </ErrorBoundary>,
    document.getElementById('root')
);
