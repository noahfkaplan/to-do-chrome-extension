import React, { useState } from 'react';
import ListItem from '../ListItem'
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
const ListArea = (props) => {
    const [list, setList] = useState(props.initialListItems);
    
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
    const handleAddItem = () => {
        setList(
            list.concat({id: list.length, text: "", checked: false })
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
            <Fab size="small" color="primary" aria-label="add">
                <AddIcon onClick={() => handleAddItem()}/>
            </Fab>
        </div>
    );
}

export default ListArea;