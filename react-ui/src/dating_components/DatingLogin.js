import React, {useState} from 'react';
import {Input, Divider} from 'semantic-ui-react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
const primary = green[900]; // #f44336


//test

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(/heartbeatlogo.png)',
    backgroundImage: 'url(https://i.ibb.co/pQBpgMz/streaks-black-stripes-green-lines-3840x2160-c2-000000-32cd32-l2-113-113-a-135-f-1.jpg)',

    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

export default function SignInSide() {
  const [nonSpotify, setNonSpotify] = useState(false);

  const classes = useStyles();
  var redirectableLogin= process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/login/dating` : `http://localhost:8888/login/dating`;
  var redirectableSignup = process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/nonspotify/signup` : `http://localhost:3000/nonspotify/signup`;
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper} style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '85vh'}}>
          
          <Avatar className={classes.dark}>
            <LockIcon style={{ color: 'red'}} />
          </Avatar>
         
    {/* {!nonSpotify ?  */}
    {/* <div>  */}
            <a href= {redirectableLogin }>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log in Spotify
            </Button>
             </a>

            
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={()=>setNonSpotify(true)}
            >
              Other Login
            </Button>
            </div>  */}
            {/* // :
            
            // <div>
            //                  <Divider  hidden />

            //    <Input size="big" icon='users' iconPosition='left' placeholder='Enter Username...' />
            //    <Divider   hidden />
            //    <Input size="big" icon='users' iconPosition='left' placeholder='Enter Password...' />
            //    <Divider />
            //    <a href= {redirectableSignup }>
            //   <Button 
            //   type="submit"
            //   fullWidth
            //   variant="contained"
            //   color="primary"
            //   className={classes.submit}
              
            // >
            //   Sign up
            // </Button>
            // </a>
            //   </div>}
            */}
             
             
        </div>
      </Grid>
    </Grid>
  );
}