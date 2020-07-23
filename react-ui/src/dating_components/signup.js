import React, { useState, useContext, createRef, useEffect } from 'react';
import { Header, Checkbox, Container, Segment, Sticky, Grid, Input, Transition, Divider, Loader } from 'semantic-ui-react';
import { Button, Form, Icon, Message, Progress, Image } from 'semantic-ui-react';
import { Link, Redirect, useParams } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios'
import storage from '../firebase/firebase'
var querystring = require('querystring');


const Signup = () => {
//   const someContext = useContext(AppState);
  const {id, access_token, refresh_token} = useParams();
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
  const [redirectableLogin, setRedirectableLogin]=useState("");
  const [fname, setFName]=useState("");
  const [lname, setLName]=useState("");

  const contextRef = createRef();

  useEffect(() => {
    CheckPass();
    if (redirect && location!==null) {
      var backendroute = process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/users/signup/${id}?` : `http://localhost:8888/users/signup/${id}?`;

      const uploadCute =  storage.ref(`users/${id}/cute`).put(fileImage1);
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
    const uploadFlirt =  storage.ref(`users/${id}/flirt`).put(fileImage2);
    uploadFlirt.on(
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
          .child('flirt')
          .getDownloadURL()
          .then(url => {
           setImage2(url);
          });
      }
    );
    const uploadCandid =  storage.ref(`users/${id}/candid`).put(fileImage3);
     uploadCandid.on(
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
            .child('candid')
            .getDownloadURL()
            .then(url => {
              setImage3(url);
            });
        }
      );


      axios.post(backendroute+querystring.stringify({
        gender: gender,
        // type: type,
        phone: phone,
        location: location,
        fname: fname,
        lname:lname
        // datingimages: [image1, image2, image3],
      }))
      .then(response => {
       console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      // window.location.assign(redirectableLogin);
    }
    console.log(redirect)
    console.log(location)
    console.log(location!==null)
  },[redirect, location]);
  useEffect(() => {
    var backendroute_image = process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/users/signup/${id}/2?` : `http://localhost:8888/users/signup/${id}/2?`;

    if(image1&&image2&&image3){
      axios.post(backendroute_image+querystring.stringify({
        datingimages: [image1, image2, image3],
      }))
      .then(response => {
       console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      window.location.assign(redirectableLogin);
    }

  }, [image1,image2,image3]);


  const PageHeader = () => {
    return (
      <Segment
        basic
        style={{ backgroundColor: "#006990", textAlign: "center", marginBottom: "0px" }}
        fluid="true"
      >
        <Grid columns={2}>
          <Grid.Column width='3' />
          <Grid.Column width='10'>
            <Header
              as={Link}
              to="/"
              inverted
              content="Nearify"
              size="large"
              color="black"
              style={{ cursor: "default" }}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  };


  function CheckLocation(){
    navigator.geolocation.getCurrentPosition((position)=>{
      setLocation([position.coords.latitude, position.coords.longitude]);
    })
    
  }
  function CheckPass() {
    if(gender!="" &&  !isNaN(Number(phone))){
      // type !=""
      var temp = process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/dating/home/${id}/${access_token}/${refresh_token}` : `http://localhost:3000/dating/home/${id}/${access_token}/${refresh_token}`;
    
      setRedirectableLogin(temp);
      setRedirect(true);
    }
    else{
     setError(true);
    }
   
  };
  
  return (
    <div ref={contextRef}>

        <Grid textAlign='center' style={{ height: '10vh' }} padded>
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
                  <Form.Field>
                    Gender
                  </Form.Field>
                <Form.Field>
                 <Checkbox
                    radio
                    label='Male'
                    checked={gender=="Male"}
                    onChange={()=>setGender("Male")}
                 />
                 </Form.Field>
                 <Form.Field>
                 <Checkbox
                    radio
                    label='Female'
                    checked={gender=="Female"}                    
                    onChange={()=> setGender("Female")}
                 />
                 </Form.Field>
                 <Form.Field>
                 <Checkbox
                    radio
                    label='Non-Binary'
                    checked={gender=="Non-Binary"}                    
                    onChange={()=> setGender("Non-Binary")}
                 />
                 </Form.Field>
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
                  <Form.Field>
                    Upload some pictures!
                  </Form.Field>
                 <Form.Input fluid

onChange={(e) => { 
      console.log(e.target.files[0])
      setFileImage(e.target.files[0]) }}
label='Upload a cute photo:'
type="file"
/>
<Form.Input fluid

onChange={(e) => { 
      console.log(e.target.files[0])
      setFileImage2(e.target.files[0]) }}
label='Upload a ;) photo:'
type="file"
/>
<Form.Input fluid

onChange={(e) => { 
      console.log(e.target.files[0])
      setFileImage3(e.target.files[0]) }}
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
              {/* <Message>
                Your privacy is important to us<a href='/privacy' target="_blank"> Privacy policy</a>
              </Message> */}
            </Grid.Column>
          </Grid.Row>
        </Grid>

    </div>
  );
};

export default Signup;