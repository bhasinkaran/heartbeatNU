import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import logo from '../res/logo-transparent.png'

// Styles to be used in sign-in page
const useStyles = makeStyles((theme) => ({
    root: {
        // height: '100vh',
    },
    image: {
        backgroundImage: `url(${logo})`,
        // backgroundImage: 'url(https://i.ibb.co/pQBpgMz/streaks-black-stripes-green-lines-3840x2160-c2-000000-32cd32-l2-113-113-a-135-f-1.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'deeppink',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

// export Sign-in page
export default function SignInSide() {
    var redirectableLogin = process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/login/dating` : `http://localhost:8888/login/dating`;
    var redirectableSignup = process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/nonspotify/signup` : `http://localhost:3000/nonspotify/signup`;

    const [nonSpotify, setNonSpotify] = useState(false);
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />

            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

                    <Avatar className={classes.dark}>
                        <LockIcon style={{ color: 'red' }} />
                    </Avatar>

                    <a href={redirectableLogin}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Log in with Spotify
                        </Button>
                    </a>
                </div>
            </Grid>
        </Grid>
    );
}