import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    buttonArea: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    }
}));


const EditListItem = (props) => {
    const classes = useStyles();
    const [url, setUrl] = useState(props.item && props.item.url);
    const [description, setDescription] = useState(props.item && props.item.text);
    return(
        <div className = 'mainArea'>
            <TextField
                label="Description"
                margin="dense"
                defaultValue={description}
                onChange={(event) => setDescription(event.target.value)}
                InputProps={{
                    "aria-label": "editDescription"
                }}
            />
            <TextField
                label="URL (optional)"
                margin="dense"
                defaultValue={url}
                onChange={(event) => setUrl(event.target.value)}
                InputProps={{
                    "aria-label": "editUrl"
                }}
            />
            <div className = {classes.buttonArea}>
                {props.item && 
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => props.onDelete()}
                        startIcon={<DeleteIcon/>}
                    >
                        Delete
                    </Button>
                }
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => props.onSave(description, url)}
                    startIcon={<SaveIcon />}
                >
                    Save
                </Button>
            </div>
        </div>
    );
}

export default EditListItem;