import React from 'react';
import { Snackbar, Button, IconButton, Link } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
// import { useHistory } from "react-router-dom";

export default function MessageSnackbar() {
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    const handleClick = () => {
        setOpen(true);
    }

    return (
        <div>
            <Button onClick={handleClick}>Open simple snackbar</Button>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="New Message!"
                action={
                    <React.Fragment>
                        <Link href="/dating/messages">
                            <Button color="secondary" size="small">
                                OPEN
                        </Button>
                        </Link>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }>

            </Snackbar>
        </div>
    );
}