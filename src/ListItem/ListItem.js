import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    input: {
      margin: theme.spacing(1),
    },
  }));

const ListItem = () =>{
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    const [itemText, setItemText] = useState("");    
    const handleCheckChange = event => {
        setChecked( event.target.checked );
    };
    const handleItemTextChange = event => {
        setItemText( event.target.value );
    }    
    return(
        <div>
            <Checkbox
                checked={checked}
                onChange={handleCheckChange}
                value="checked"
                inputProps={{
                    'aria-label': 'primary checkbox',
                }}
            />
            <Input
                placeholder={"Placeholder Text"}
                value={itemText}
                onChange={handleItemTextChange}
                className={classes.input}
                inputProps={{
                    'aria-label': 'description',
                }}
            />
        </div>
    );
}

export default ListItem;