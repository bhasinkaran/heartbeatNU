import React, { useState, useContext, createRef, useEffect } from 'react';
import { Header, Checkbox, Container, Segment, Sticky, Grid, Input, Transition, Divider, Loader } from 'semantic-ui-react';
import { Button, Form, Icon, Message, Progress, Image } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
var querystring = require('querystring');

const Signup = () => {
//   const someContext = useContext(AppState);
  const [error, setError] = useState(false);
  const [pass, setPass] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [redirect, setRedirect] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("");
  const [query, setQuery]=useState("");
  const [redirectableLogin, setRedirectableLogin]=useState("");
  const contextRef = createRef();

  useEffect(() => {
    if (redirect) {

      window.location.assign(redirectableLogin);
    }
  },[redirect]);


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



  function CheckPass() {
    if(gender!="" && type !="" && !isNaN(Number(phone))){
      
      var temp = process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/login?` : `http://localhost:8888/login?`;
      temp=temp+querystring.stringify({
        gender: gender,
        type: type,
        phone: phone
      });
      setRedirectableLogin(temp);
      setRedirect(true);
    }
    else{
     
     setError(true);
    }
   
  };
  function functiontoredirect() {
    window.location.assign(redirectableLogin);
  }
  return (
    <div ref={contextRef}>
      <PageHeader />
      <Sticky context={contextRef} >
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
                    onChange={(e) => { setPhone(e.target.value) }}
                    id='form-subcomponent-shorthand-input-first-name'
                    placeholder='US Phone number'
                  />
                  <Form.Field>
                    Gender? 
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
                 <Form.Field>
                    Into? Like your type?
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
                 </Form.Field>
                  <Button color='teal' fluid size='large' onClick={() => CheckPass()}>
                    Continue
                 </Button>
                </Segment>
                {error ? 
                <div style={{ maxWidth: 450 }}>
                  <Message
                    warning
                    floating
                    content="This username already exists! Please choose another"
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


        {/* {redirect && redirectableLogin!=""? ()=>{functiontoredirect()} : ""} } */}

      </Sticky>
    </div>
  );
};

export default Signup;