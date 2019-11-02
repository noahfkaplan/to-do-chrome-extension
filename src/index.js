import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ListArea from './ListArea';
import EditListItem from "./EditListItem"

ReactDOM.render(
    <ListArea initialListItems = {[{ id: 0, text: "default item", checked: false, url: "http://www.google.com" }]}/>,
    document.getElementById('root')
);
