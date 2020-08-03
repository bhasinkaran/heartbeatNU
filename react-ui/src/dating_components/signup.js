import React, { useState, useContext, createRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
// import { Header, Checkbox, Container, Segment, Sticky, Grid, Input, Transition, Divider, Loader } from 'semantic-ui-react';
// import { Button, Form, Icon, Message, Progress, Image } from 'semantic-ui-react';
import {Divider} from 'semantic-ui-react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import {Redirect} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios'
import storage from '../firebase/firebase'
import ChooseQuestion from './SignUpComponents./ChooseQuestion';
import ImageUpload from './SignUpComponents./ImageUpload'
var querystring = require('querystring');

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Signup = () => {
  const classes = useStyles();
  //   const someContext = useContext(AppState);
  const { id, access_token, refresh_token } = useParams();
  const [error, setError] = useState(false);
  const [pass, setPass] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [redirect, setRedirect] = useState(false)
  const [image1, setImage1] = useState("")
  const [image2, setImage2] = useState("")
  const [image3, setImage3] = useState("")
  const [fileImage1, setFileImage] = useState("")
  const [fileImage2, setFileImage2] = useState("")
  const [fileImage3, setFileImage3] = useState("")
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState(null);
  const [redirectableLogin, setRedirectableLogin] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [bio, setBio] = useState("");
  const allquestions = ["What's the last song that was stuck in your head?",
    "Who's music taste has been most influential in your life?",
    "Who's the first person you send new music to?",
    "What do you miss most about being at a concert?",
    "What does music mean to you?",
    "What's a genre of music you haven't explored enough but want to revisit?",
    "An artist you’d like to meet?",
    "Your favorite throwback jams?"
  ]
  const [questions, setQuestions] = useState(allquestions);
console.log(questions);
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");
  const [ques1, setQues1] = useState("");
  const [ques2, setQues2] = useState("");
  const [ques3, setQues3] = useState("");
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          HeartBeat
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }




  const contextRef = createRef();

  useEffect(() => {
    CheckPass();
    if (redirect && location !== null) {
      var backendroute = process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/users/signup/${id}?` : `http://localhost:8888/users/signup/${id}?`;
      
      const uploadCute = storage.ref(`users/${id}/cute`).put(fileImage1);
      uploadCute.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // setProgress(progress);
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("users")
            .child(id)
            .child('cute')
            .getDownloadURL()
            .then(url => {
              setImage1(url);
            });
        }
      );
      // const uploadFlirt = storage.ref(`users/${id}/flirt`).put(fileImage2);
      // uploadFlirt.on(
      //   "state_changed",
      //   snapshot => {
      //     const progress = Math.round(
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //     );
      //     // setProgress(progress);
      //   },
      //   error => {
      //     console.log(error);
      //   },
      //   () => {
      //     storage
      //       .ref("users")
      //       .child(id)
      //       .child('flirt')
      //       .getDownloadURL()
      //       .then(url => {
      //         setImage2(url);
      //       });
      //   }
      // );
      // const uploadCandid = storage.ref(`users/${id}/candid`).put(fileImage3);
      // uploadCandid.on(
      //   "state_changed",
      //   snapshot => {
      //     const progress = Math.round(
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //     );
      //     // setProgress(progress);
      //   },
      //   error => {
      //     console.log(error);
      //   },
      //   () => {
      //     storage
      //       .ref("users")
      //       .child(id)
      //       .child('candid')
      //       .getDownloadURL()
      //       .then(url => {
      //         setImage3(url);
      //       });
      //   }
      // );

console.log(allquestions.indexOf(ques1));
var q1ind = allquestions.indexOf(ques1).toString();
var q2ind = allquestions.indexOf(ques2).toString();
var q3ind = allquestions.indexOf(ques3).toString();
        console.log(q1ind);
      axios.post(backendroute + querystring.stringify({
        gender: gender,
        phone: phone,
        location: location,
        fname: fname,
        lname: lname,
        bio: bio,
        q1: q1ind,
        q2: q2ind,
        q3: q3ind,
        ans1: ans1,
        ans2: ans2,
        ans3: ans3
        // datingimages: [image1, image2, image3],
      }))
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      window.location.assign(redirectableLogin);
    }
    console.log(redirect)
    console.log(location)
    console.log(location !== null)
  }, [redirect, location]);
  useEffect(() => {
    var backendroute_image = process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/users/signup/${id}/2?` : `http://localhost:8888/users/signup/${id}/2?`;

    if (image1 ) {
      axios.post(backendroute_image + querystring.stringify({
        datingimages: [image1],
      }))
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      window.location.assign(redirectableLogin);
    }

  }, [image1, image2, image3]);
  useEffect(() => {
    //toadd
  }, [ques1, ques2, ques3]);


  function CheckLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation([position.coords.latitude, position.coords.longitude]);
    })

  }
  function CheckPass() {
    if (fileImage1) {
      // gender != ""
      // type !=""
      // && !isNaN(Number(phone)
      var temp = process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/dating/home/${id}/${access_token}/${refresh_token}` : `http://localhost:3000/dating/home/${id}/${access_token}/${refresh_token}`;
      console.log(typeof fileImage1);
    
      setRedirectableLogin(temp);
      setRedirect(true);
    }
    else {
      setError(true);
    }

  };

  useEffect(()=>
  console.log(image1), [image1])

  {
    return (
      <div ref={contextRef}>
   <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={fname}
                  onChange = {(event) => {
                    setFName(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange = {(event) => {
                    setLName(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Bio"
                  name="email"
                  autoComplete="email"
                  onChange = {(event) => {
                    setBio(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} >
              <ChooseQuestion availableQuestions={questions} chosen={ques1} setter={setQues1} />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="ques1"
                  label="Question 1 Answer"
                  id="ques1"
                  // autoComplete="current-password"
                  onChange = {(event, newVal) => {
                    setAns1(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} >
  
              <ChooseQuestion availableQuestions={questions} chosen={ques2} setter={setQues2} />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="ques2"
                  label="Question 2 Answer"
                  id="ques2"
                  // autoComplete="current-password"
                  onChange = {(event, newVal) => {
                    setAns2(event.target.value)
                  }}
                />
              </Grid>
              <Grid marginTop="0px" item xs={12}>
              <ChooseQuestion availableQuestions={questions} chosen={ques3} setter={setQues3} />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="ques3"
                  label="Question 3 Answer"
                  id="ques3"
                  // autoComplete="current-password"
                  onChange = {(event, newVal) => {
                    setAns3(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} >
                <ImageUpload setter={setFileImage} />
              </Grid>
              {/* <Divider />
              <Grid item xs={12} >
                <ImageUpload setter={setFileImage2} />
              </Grid>
              <Divider />
              <Grid item xs={12}>
                <ImageUpload setter={setFileImage3} />
              </Grid> */}
            </Grid>
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => CheckLocation()}
            >
              Sign Up
            </Button>
          </form>
          </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      </div>
    );
  } 
  
  
};

export default Signup;

// dating questions
{/* <Form.Field>
                    Looking for a relationship ?
                  </Form.Field>
                <Form.Field>
                 <Checkbox
                    radio
                    label='Males'
                    checked={type=="Male"}
                    onChange={()=>setType("Male")}
                 />
                 </Form.Field>
                 <Form.Field>
                 <Checkbox
                    radio
                    label='Females'
                    checked={type=="Female"}
                    onChange={()=>setType("Female")}
                 />
                 </Form.Field>
                 <Form.Field>
                 <Checkbox
                    radio
                    label='Both'
                    checked={type=="Both"}
                    onChange={()=>setType("Both")}
                 />
                 </Form.Field> */}

                //  privacy policy
                //  <Message>
                // Your privacy is important to us<a href='/privacy' target="_blank"> Privacy policy</a>
                // </Message> 


                {/* <Grid textAlign='center' style={{ height: '10vh' }} padded>
        <Divider hidden />
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h5">
              Nearify does not share your data/information with any 3rd party.
              </Header>
            <Form size='large' warning={error}>
              <Segment stacked>
                <Form.Input
                  required={true}
                  onChange={(e) => { setFName(e.target.value) }}
                  id='form-subcomponent-shorthand-input-first-name'
                  placeholder='First Name'
                />
                <Form.Input
                  required={true}
                  onChange={(e) => { setLName(e.target.value) }}
                  id='form-subcomponent-shorthand-input-first-name'
                  placeholder='Last Name'
                />
                <Form.Input
                  required={true}
                  onChange={(e) => { setPhone(e.target.value) }}
                  id='form-subcomponent-shorthand-input-first-name'
                  placeholder='US Phone number'
                />
                <Form.Input
                  required={true}
                  onChange={(e) => { setBio(e.target.value) }}
                  id='form-subcomponent-shorthand-input-first-name'
                  placeholder='Bio'
                />
                <ChooseQuestion availableQuestions={questions} setter={setQues1} />
                <Form.Input
                  required={true}
                  onChange={(e) => { setAns1(e.target.value) }}
                  id='form-subcomponent-shorthand-input-first-name'
                  placeholder='Answer'
                />
                <ChooseQuestion availableQuestions={questions} setter={setQues2} />
                <Form.Input
                  required={true}
                  onChange={(e) => { setAns2(e.target.value) }}
                  id='form-subcomponent-shorthand-input-first-name'
                  placeholder='Answer'
                />
                <ChooseQuestion availableQuestions={questions} setter={setQues3} />
                <Form.Input
                  required={true}
                  onChange={(e) => { setAns3(e.target.value) }}
                  id='form-subcomponent-shorthand-input-first-name'
                  placeholder='Answer'
                />
                <Form.Input
                  required={true}
                  onChange={(e) => { setBio(e.target.value) }}
                  id='form-subcomponent-shorthand-input-first-name'
                  placeholder='Bio'
                />
                <Form.Field>
                  Gender
                  </Form.Field>
                <Form.Field>
                  <Checkbox
                    radio
                    label='Male'
                    checked={gender == "Male"}
                    onChange={() => setGender("Male")}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    radio
                    label='Female'
                    checked={gender == "Female"}
                    onChange={() => setGender("Female")}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    radio
                    label='Non-Binary'
                    checked={gender == "Non-Binary"}
                    onChange={() => setGender("Non-Binary")}
                  />
                </Form.Field>

                <Form.Field>
                  Upload some pictures!
                  </Form.Field>
                <Form.Input fluid

                  onChange={(e) => {
                    console.log(e.target.files[0])
                    setFileImage(e.target.files[0])
                  }}
                  label='Upload a cute photo:'
                  type="file"
                />
                <Form.Input fluid

                  onChange={(e) => {
                    console.log(e.target.files[0])
                    setFileImage2(e.target.files[0])
                  }}
                  label='Upload a ;) photo:'
                  type="file"
                />
                <Form.Input fluid

                  onChange={(e) => {
                    console.log(e.target.files[0])
                    setFileImage3(e.target.files[0])
                  }}
                  label='Upload a candid photo:'
                  type="file"
                />
                <Button color='teal' fluid size='large' onClick={() => CheckLocation()}>
                  Continue
                 </Button>
              </Segment>
              {error ?
                <div style={{ maxWidth: 450 }}>
                  <Message
                    warning
                    floating
                    content="Make sure your phone number is a number and that you've chosen your gender and type."
                    size="tiny"
                  />
                </div> : ""}
            </Form>
            
          </Grid.Column>
        </Grid.Row>
      </Grid> */}

  //     const PageHeader = () => {
  //   return (
  //     <Segment
  //       basic
  //       style={{ backgroundColor: "#006990", textAlign: "center", marginBottom: "0px" }}
  //       fluid="true"
  //     >
  //       <Grid columns={2}>
  //         <Grid.Column width='3' />
  //         <Grid.Column width='10'>
  //           <Header
  //             as={Link}
  //             to="/"
  //             inverted
  //             content="Nearify"
  //             size="large"
  //             color="black"
  //             style={{ cursor: "default" }}
  //           />
  //         </Grid.Column>
  //       </Grid>
  //     </Segment>
  //   );
  // };


