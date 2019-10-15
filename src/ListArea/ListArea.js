import React, { useState } from 'react';
import ListItem from '../ListItem'

const ListArea = () => {
    const [list, setList] = useState([{ text: "default item", checked: false }]);
    
    const handleCheckChange = text => event => {
        setList({ ...list, [text] : event.target.checked });
    };
    const handleTextChange = text => event => {
        setList({ ...list, [text] : event.target.value });
    }

    return(
        <div className = 'mainArea'>
            {list.map(item => {
                return <ListItem 
                    onCheckChange = {() => handleCheckChange(list.text)} 
                    onTextChange = {() => handleTextChange(list.text)} 
                    text = {item.text} 
                    checked = {item.checked}>
                </ListItem>
            })}
        </div>
    );
}

export default ListArea;