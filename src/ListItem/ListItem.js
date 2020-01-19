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
        flexDirection: 'row',
        alignItems: 'center'
    },
    link: {
        wordWrap: 'Normal',
        padding: '10px',
        flex: 1,
    },
    fab: {
        float: 'right',
    }
  }));

const ListItem = (props) =>{
    const classes = useStyles();
    return(
        <div className={classes.container}>
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
            <Link href={props.url} color="inherit" target="_blank" className={classes.link}>
                {props.text}
            </Link>
            <Fab onClick = {() => props.onEdit()}size="small" color="secondary" aria-label="edit" className={classes.fab}>
                <EditIcon />
            </Fab>
        </div>
    );
}

export default ListItem;