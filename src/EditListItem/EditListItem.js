import React from 'react';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
  }));

const EditListItem = (props) => {
    const classes = useStyles;
    return(
        <div className = 'mainArea'>
            <TextField
                id="standard-dense"
                label="Description"
                defaultValue={props.description}
                className={clsx(classes.textField, classes.dense)}
                margin="dense"
            />
            <TextField
                id="standard-dense"
                label="URL (optional)"
                defaultValue={props.url}
                className={clsx(classes.textField, classes.dense)}
                margin="dense"
            />
            <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<SaveIcon />}
            >
                Save
            </Button>
        </div>
    );
}

export default EditListItem;