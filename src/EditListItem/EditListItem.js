import React, {useState} from 'react';
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
    const [url, setUrl] = useState(props.url);
    const [description, setDescription] = useState(props.description);
    const classes = useStyles;
    return(
        <div className = 'mainArea'>
            <TextField
                id="standard-dense"
                label="Description"
                className={clsx(classes.textField, classes.dense)}
                margin="dense"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />
            <TextField
                id="standard-dense"
                label="URL (optional)"
                className={clsx(classes.textField, classes.dense)}
                margin="dense"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => props.onClick(description, url)}
                startIcon={<SaveIcon />}
            >
                Save
            </Button>
        </div>
    );
}

export default EditListItem;