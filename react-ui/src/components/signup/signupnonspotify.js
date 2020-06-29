import storage from '../../firebase/firebase'
import React, { useState, useContext, createRef, useEffect } from 'react';
import { Header, Checkbox, Card, Container, Segment, Sticky, Grid, Input, GridRow, Divider, GridColumn } from 'semantic-ui-react';
import { Button, Form, Icon, Image, List, Label, Transition, Modal, Dropdown} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Loader, Dimmer } from 'semantic-ui-react';
import { dbStudents } from '../../firebase/firebase';
import axios from 'axios'

const SignUpNonSpotify = () =>{

        const [firstName, setFirstName] = useState(null);
        const [username, setUsername] = useState(null);
        const [password, setPassword] = useState(null);
        const [image, setImage] = useState(null);
        const [url, setUrl]=useState("");
        const [lastName, setLastName] = useState(null);
       
        return(
        <div>
      <Sticky context={contextRef} >
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Grid padded textAlign="center">
          <Grid.Row>
            <Form size="large" >
              <Form.Group widths='equal'>
                <Form.Input
                  required={true}
                  onChange={(e) => { setFirstName(e.target.value) }}
                  label='First Name:'
                />
              </Form.Group>
            </Form>
          </Grid.Row>
          <Grid.Row>
            <Form size="large">
              <Form.Group widths='equal'>
                <Form.Input
                  required={true}
                  onChange={(e) => { setLastName(e.target.value) }}
                  label='Last Name:'
                />
              </Form.Group>
            </Form>
          </Grid.Row>
          <Grid.Row>
            <Form size="large">
              <Form.Group widths='equal'>
                <Form.Input
                  required={true}
                  onChange={(e) => { setUsername(e.target.value) }}
                  label='Username:'
                />
              </Form.Group>
            </Form>
          </Grid.Row>
          <Grid.Row>
            <Form size="large">
              <Form.Group widths='equal'>
                <Form.Input
                  required={true}
                  onChange={(e) => { setPassword(e.target.value) }}
                  label='Password:'
                />
              </Form.Group>
            </Form>
          </Grid.Row>
          <Grid.Row>
            <Form size="large">
              <Form.Group widths='equal'>
                <Form.Input
                  onChange={(e) => { 
                        console.log(e.target.files[0])
                        setImage(e.target.files[0]) }}
                  label='Profile Picture:'
                  type="file"
                />
              </Form.Group>
            </Form>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <Button circular
                compact
                fluid
                as={ isValid() ? Link : Button}
                to={isValid() ? `/student` : '/'}
                color='blue'
                icon
                // onClick={() => Push()}
                >
                <Button.Content>
                  <Icon name="long arrow alternate right" size="large"></Icon>
                </Button.Content>
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <Header as="h3">
               We do not share your data with any outside party.
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Sticky>
    </div>
        )
}