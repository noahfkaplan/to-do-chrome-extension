import React, { useState } from 'react';
import ListItem from '../ListItem'
import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditListItem from '../EditListItem'

const defaultItem = {
     id: -1, 
     text: "",
     checked: false,
     url: "",
}

const useStyles = makeStyles(theme => ({
    fab: {
        float: 'right',
        margin: '10px',
    }
}));

const ListArea = (props) => {    
    const classes = useStyles();
    const [list, setList] = useState(props.initialListItems);
    const [content, setContent] = useState("list") //list or edit
    const [activeListItem, setActiveListItem] = useState(defaultItem)
    
    const handleCheckChange = id => event => {
        setList(
            list.map(item => item.id === id ? {...item, checked: event.target.checked} : item )
        );
    };
    const handleEdit = id => {
        setActiveListItem(list.find(item => item.id === id))
        setContent("edit")
    }
    const handleSaveItem = (description, url) => {
        setContent("list");
        if(activeListItem === defaultItem){
            setList(
                list.concat({id: list.length, text: description, url: url, checked: false })
            );
        }
        else{
            setList(
                list.map(item => item.id === activeListItem.id ? {...item, text: description, url: url} : item )
            );
            setActiveListItem(defaultItem);
        }
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
                    onEdit = {() => handleEdit(item.id)} 
                    text = {item.text} 
                    checked = {item.checked}
                    url = {item.url}>
                </ListItem>
            })}
            <Fab size="small" color="primary" onClick={() => handleAddItem()} className={classes.fab}>
                <AddIcon aria-label="add"/>
            </Fab>
        </div> :
        <EditListItem item = {activeListItem} onSave = {handleSaveItem}/>
    );
}

export default ListArea;