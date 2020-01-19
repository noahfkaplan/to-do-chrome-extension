import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';


const EditListItem = (props) => {
    const [url, setUrl] = useState(props.item.url);
    const [description, setDescription] = useState(props.item.text);
    return(
        <div className = 'mainArea'>
            <TextField
                label="Description"
                margin="dense"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                InputProps={{
                    "aria-label": "editDescription"
                }}
            />
            <TextField
                label="URL (optional)"
                margin="dense"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                InputProps={{
                    "aria-label": "editUrl"
                }}
            />
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
    );
}

export default EditListItem;