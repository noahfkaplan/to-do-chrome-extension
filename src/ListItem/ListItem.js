import React from 'react';
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

const ListItem = (props) =>{
    const classes = useStyles();
    return(
        <div>
            <Checkbox
                checked={props.checked}
                onChange={props.onCheckChange}
                value="checked"
                inputProps={{
                    'aria-label': 'primary checkbox',
                }}
            />
            <Input
                placeholder={"Placeholder Text"}
                value={props.text}
                onChange={props.handleTextChange}
                className={classes.input}
                inputProps={{
                    'aria-label': 'description',
                }}
            />
        </div>
    );
}

export default ListItem;