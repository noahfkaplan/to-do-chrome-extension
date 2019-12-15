import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
//import Input from '@material-ui/core/Input';
import Link from '@material-ui/core/Link';
import {Fab} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    // input: {
    //   margin: theme.spacing(1),
    // },
    link: {
        margin: '10px',
    }
  }));

const ListItem = (props) =>{
    const classes = useStyles();
    return(
        <div>
            <Checkbox
                checked={props.checked}
                onChange={props.onCheckChange()}
                aria-checked={props.checked}
                value={props.text}
                title={"checkbox"}
                inputProps={{
                    'aria-label': props.text + " checkbox",
                }}
            />
            {/* <Input
                placeholder={"Placeholder Text"}
                value={props.text}
                onChange={props.onTextChange()}
                className={classes.input}
                inputProps={{
                    'aria-label': props.text + " textarea",
                }}
            /> */}
            <Link href={props.url} color="inherit" target="_blank" className={classes.link}>
                {props.text}
            </Link>
            <Fab size="small" color="secondary" aria-label="edit" className={classes.fab}>
                <EditIcon />
            </Fab>
        </div>
    );
}

export default ListItem;