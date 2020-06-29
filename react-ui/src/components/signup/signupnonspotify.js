import storage from '../../firebase/firebase'
import React, { useState, useContext, createRef, useEffect } from 'react';
import { Header, Checkbox, Card, Container, Segment, Sticky, Grid, Input, GridRow,Search, Divider, GridColumn } from 'semantic-ui-react';
import { Button, Form, Icon, Image, List, Label, Transition, Modal, Dropdown} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Loader, Dimmer } from 'semantic-ui-react';
import _ from 'lodash'
import axios from 'axios'
var querystring = require('querystring');

const SignUpNonSpotify = () =>{

        const [firstName, setFirstName] = useState(null);
        const [username, setUsername] = useState(null);
        const [password, setPassword] = useState(null);
        const [image, setImage] = useState(null);
        const [url, setUrl]=useState("");
        const [lastName, setLastName] = useState(null);
        const[favartists, setFavArtists]=useState([]);
        const[favSongs, setFavSongs]=useState([]);

        //for searchbar
        const [value, setValue]=useState("");
        const [results, setResults]=useState([]);
        const [isLoading, setisLoading]=useState(false);
        const [result, setResult]=useState("");

        async function  handleSearchChange(valuee)  {
                setisLoading(true);
                setValue(valuee);
                console.log(valuee);
                const url='https://api.spotify.com/v1/search'+`?q=${encodeURIComponent(valuee)}`+"&type=artist"
                const res = await axios.get(url, {
                        headers:{
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                                // 'Authorization': 'Bearer ' + accesstoken 
                        }
                });
                var temp=[];
                console.log(res);
                var max=res.data.artists.items.length;
                var realistic=10;
                if(max<realistic){
                  realistic=max;
                }
                for(let i=0; i<realistic; i++){
                        let item=res.data.artists.items[i];
                        // console.log(item);
                        if(item.images[0]){
                                temp.push({title: item.name, image: item.images[0].url, description: item.genres[0], price: item.popularity, id: item.id, type: "artist"})
              
                        }
                        else{
                                //if no pictures just put a black picture
                                temp.push({title: item.name, image: "https://images.unsplash.com/photo-1554050857-c84a8abdb5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80", description: item.genres[0], price: item.popularity, id: item.id, type: "artist"})
                        }
                }
              
                const urltrack='https://api.spotify.com/v1/search'+`?q=${encodeURIComponent(valuee)}`+"&type=track"
              
                const ressong = await axios.get(urltrack, {
                  headers:{
                          "Accept": "application/json",
                          "Content-Type": "application/json",
                        //   'Authorization': 'Bearer ' + accesstoken 
                  }
              });
              // console.log("this is res SONG",ressong);
              var max=ressong.data.tracks.items.length;
              var realistic=10;
              if(max<realistic){
                realistic=max;
              }
              for(let i=0; i<realistic; i++){
                  let item=ressong.data.tracks.items[i];
                  console.log(item);
                  if(item.album.images[0]){
                          temp.push({title: item.name, image: item.album.images[0].url, description: item.album.name, price: item.popularity, id: item.id, type: "track"})
              
                  }
                  else{
                          //if no pictures just put a black picture
                          // temp.push({title: item.name, image: ", description: item.genres[0], price: item.popularity, id: item.id})
                          temp.push({title: item.name, image: "https://images.unsplash.com/photo-1554050857-c84a8abdb5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80", description: item.album.name, price: item.popularity, id: item.id, type: "track"})
              
                        }
              }
                temp.sort((a,b)=>{
                 if( a.price > b.price ){
                   return -1;
                 }
                 else{
                   return 1;
                 };
                })       
                // console.log(temp);
              
                setResults(temp);
                // console.log(temp);
                setisLoading(false);
              }

        function Push(){

   const uploadTask = storage.ref(`users/${username}`).put(image);
    uploadTask.on(
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
          .ref("students")
          .child(username)
          .getDownloadURL()
          .then(url => {
                //   axios.post()
        //    dbUsers.child(username).update({
                //    "url":url
           });
          });
      }
    
        
       
        return(
        <div>
                {/* context={contextRef} */}
      <Sticky  >
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
                // as={ isValid() ? Link : Button}
                // to={isValid() ? `/student` : '/'}
                color='blue'
                icon
                onClick={() => Push()}
                >
                <Button.Content>
                  <Icon name="long arrow alternate right" size="large"></Icon>
                </Button.Content>
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>

            <Search
            loading={isLoading}
            onResultSelect={(e, {result})=>{
                    setResult(result);
                    console.log(result);
                    // setRedirect(true);
                    if(result.type=="artist"){
                //       setRedirectArtist(true);
                    }
                    else{
                //       setRedirectTrack(true);
                    }
                    
            }}
            onSearchChange={_.debounce((e, {value})=>handleSearchChange(value), 500, {
              leading: true,
            })}
            results={results}
            value={value}
            fluid
            input={{ fluid: true }}
        //     {...this.props}
          />
              <Header as="h3">
               We do not share your data with any outside party.
              </Header>
            </Grid.Column>
          </Grid.Row>
        <Grid.Row>
                <Grid.Column width={6}>
                  <     Header as="h3">
                                 We do not share your data with any outside party.
                        </Header>
            </Grid.Column>
          </Grid.Row>        
        </Grid>
      </Sticky>
    </div>
        )
}
export default SignUpNonSpotify;