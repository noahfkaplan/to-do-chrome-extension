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
    const [updated, setUpdated] = useState(false);
    
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
        
        setActiveListItem(null)
        setUpdated(false);
    }, [updated]);

    const handleCheckChange = id => event => {
        setList(
            list.map(item => item.id === id ? {...item, completed: event.target.checked} : item )
        );
    };
    const handleEdit = id => {
        setActiveListItem(list.find(item => item.id === id))
        setContent("edit")
    }
    const handleSaveItem = async (description, url) => {
        
        const listItem = { "_id": activeListItem? activeListItem.id: null, "listId": 0, "text": description, "url": url, "completed": false }
        const listService = new ListService();
        await listService.PostListItem(listItem)
            .then(res => setUpdated(true))
            .catch(err => setError(err));
        
        setContent("list");
    }

    const handleDelete = async (id) => {
        const listService = new ListService();
        await listService.DeleteListItemByItemId(id)
            .then(res => setUpdated(true))
            .catch(err => setError(err));
            
        setContent("list");
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