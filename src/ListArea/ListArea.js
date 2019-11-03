import React, { useState } from 'react';
import ListItem from '../ListItem'
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditListItem from '../EditListItem'

const ListArea = (props) => {
    const [list, setList] = useState(props.initialListItems);
    const [content, setContent] = useState("list") //list or edit
    
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
    const handleSaveItem = (description, url) => {
        setContent("list");
        setList(
            list.concat({id: list.length, text: description, url: url, checked: false })
        );
    }

    const handleAddItem = () => {
        setContent("edit");
    }

    return(
        content === "list"?
        <div className = 'mainArea'>
            {list.map(item => {
                return <ListItem
                    key = {item.id} 
                    onCheckChange = {() => handleCheckChange(item.id)} 
                    onTextChange = {() => handleTextChange(item.id)} 
                    text = {item.text} 
                    checked = {item.checked}
                    url = {item.url}>
                </ListItem>
            })}
            <Fab size="small" color="primary" onClick={() => handleAddItem()}>
                <AddIcon aria-label="add"/>
            </Fab>
        </div> :
        <EditListItem description = "" url = "" onClick = {handleSaveItem}/>
    );
}

export default ListArea;