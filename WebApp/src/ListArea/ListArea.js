import React, { useState, useEffect } from 'react';
import ListItem from '../ListItem'
import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditListItem from '../EditListItem'
import ListService from '../api/Services/ListService'

const useStyles = makeStyles(theme => ({
    fab: {
        float: 'right',
        margin: '10px',
    }
}));



const ListArea = () => { 
       
    const classes = useStyles();
    const [list, setList] = useState(null);
    const [content, setContent] = useState("list") //list or edit
    const [activeListItem, setActiveListItem] = useState(null);
    const [error, setError] = useState(null);
    
    if(error){
        throw error;
    }

    useEffect(() => {
        async function fetchData() {            
            const listService = new ListService();
            let listItems = await listService.GetListItemsByListId(0);
            setList(listItems);
        }
        
        fetchData()
            .then(res => res)
            .catch(err => setError(err));
    }, []);
    
    const handleCheckChange = id => event => {
        setList(
            list.map(item => item.id === id ? {...item, completed: event.target.checked} : item )
        );
    };
    const handleEdit = id => {
        setActiveListItem(list.find(item => item.id === id))
        setContent("edit")
    }
    const handleSaveItem = (description, url) => {
        setContent("list");
        if(!activeListItem){
            setList(
                list.concat({id: list.length, text: description, url: url, completed: false })
            );
        }
        else{
            setList(
                list.map(item => item.id === activeListItem.id ? {...item, text: description, url: url} : item )
            );
            setActiveListItem(null);
        }
    }

    const handleDelete = (id) => {
        setContent("list");
        setList(
            list.filter(item => item.id !== id)
        );
        setActiveListItem(null);
    }

    const handleAddItem = () => {
        setContent("edit");
    }

    return(
        content === "list"?        
        <div className = 'mainArea'>
            {list && list.map(item => {
                return <ListItem
                    key = {item.id} 
                    onCheckChange = {() => handleCheckChange(item.id)} 
                    onEdit = {() => handleEdit(item.id)} 
                    text = {item.text} 
                    completed = {item.completed}
                    url = {item.url}>
                </ListItem>
            })}
            {list && <Fab size="small" color="primary" onClick={() => handleAddItem()} className={classes.fab}>
                <AddIcon aria-label="add"/>
            </Fab>}
        </div> :
        <EditListItem item = {activeListItem} onSave = {handleSaveItem} onDelete = {() => handleDelete(activeListItem.id)}/>
    );
}

export default ListArea;