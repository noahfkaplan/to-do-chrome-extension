import React from 'react';

const ListItem = (props) =>{
    return(
        <div>
            <input type = 'checkbox'/>
            <input type = 'text' value = {props.children}/>
        </div>
    );
}

export default ListItem;