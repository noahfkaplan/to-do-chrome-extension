import React from 'react';
import ListItem from '../ListItem'

const ListArea = () => {
    return(
        <div className = 'mainArea'>
            <ListItem>
                Item #1
            </ListItem>
            <ListItem>
                Item #2
            </ListItem>
        </div>
    );
}

export default ListArea;