import React, { useState } from 'react';
import ListItem from '../ListItem'

const ListArea = () => {
    const [list, setList] = useState([{ text: "default item", checked: false },{ text: "default item", checked: false },{ text: "default item", checked: false }]);
    
    const handleCheckChange = text => event => {
        let updatedList = list.map(item => item.text === text ? {...item, checked: event.target.checked} : item );
        setList(updatedList);
    };
    const handleTextChange = text => event => {
        let updatedList = list.map(item => item.text === text ? {...item, text: event.target.value}: item );
        setList(updatedList);
    }

    return(
        <div className = 'mainArea'>
            {list.map(item => {
                return <ListItem
                    key = {item.text} 
                    onCheckChange = {() => handleCheckChange(item.text)} 
                    onTextChange = {() => handleTextChange(item.text)} 
                    text = {item.text} 
                    checked = {item.checked}>
                </ListItem>
            })}
        </div>
    );
}

export default ListArea;