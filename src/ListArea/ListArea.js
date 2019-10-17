import React, { useState } from 'react';
import ListItem from '../ListItem'

const ListArea = () => {
    const [list, setList] = useState([{ id: 0, text: "default item", checked: false }]);
    
    const handleCheckChange = id => event => {
        setList(
            list.map(item => item.id === id ? {...item, checked: event.target.checked} : item )
        );
    };
    
    const handleTextChange = id => event => {
        setList(
            list.map(item => item.id === id ? {...item, text: event.target.value}: item )
        );
    }

    return(
        <div className = 'mainArea'>
            {list.map(item => {
                return <ListItem
                    key = {item.id} 
                    onCheckChange = {() => handleCheckChange(item.id)} 
                    onTextChange = {() => handleTextChange(item.id)} 
                    text = {item.text} 
                    checked = {item.checked}>
                </ListItem>
            })}
        </div>
    );
}

export default ListArea;