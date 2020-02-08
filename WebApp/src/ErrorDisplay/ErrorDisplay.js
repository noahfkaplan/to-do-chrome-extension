import React from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: '20px',
    },
    message: {
        padding: '10px',
        fontSize: '20px',
        fontWeight: 'bolder',
    },
}));


const ErrorDisplay = (props) => {
    const classes = useStyles();
    return(       
        <div className = 'mainArea'>
            <div className = {classes.message}>
                {props.error.message}
            </div>
            <Button
                className = {classes.button}
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => props.onRefresh()}
                startIcon={<RefreshIcon/>}
            >
                Refresh
            </Button>
        </div>
    )
}

export default ErrorDisplay;
