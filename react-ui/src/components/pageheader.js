import { Header, Segment, Grid, Icon, Button, Search } from 'semantic-ui-react';
import React, {useState} from 'react';
import { Redirect, Link} from 'react-router-dom';
import _ from 'lodash'
import axios from 'axios'
import {InfoContext} from '../App'
import { Sidebar } from 'semantic-ui-react'




const PageHeader = ({access_token, id}) => {
  const {replies, setReplies, artists, visible, setVisible, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshToken} = React.useContext(InfoContext);

  const [value, setValue]=useState("");
  const [results, setResults]=useState([]);
  const [isLoading, setisLoading]=useState(false);
  const [result, setResult]=useState("");
  const [redirectArtist, setRedirectArtist]=useState(false);
  const [redirectTrack, setRedirectTrack]=useState(false);
  const [redirectLogout, setRedirectLogout]=useState(false);
  const [redirectSettings, setRedirectSettings]=useState(false);
  const [logout, setLogout]=useState(false);
  const [home, setRedirectHome]=useState(false);

  async function  handleSearchChange(valuee)  {
    setisLoading(true);
    setValue(valuee);
    console.log(valuee);
    const url='https://api.spotify.com/v1/search'+`?q=${encodeURIComponent(valuee)}`+"&type=artist"
    const res = await axios.get(url, {
            headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + accesstoken 
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
              'Authorization': 'Bearer ' + accesstoken 
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
    return (
      <div>
      <Segment
      basic
      style={{ backgroundColor: "#1DB954", textAlign: "center", marginBottom: "10px" }}
      fluid="true">
        <Grid centered >
          <Grid.Row>
          <Grid.Column width={"5"}>
          <Header
            as={Link}
            to={`/home/${access_token}/${id}`}
            inverted 
            content="Nearify: Everything About Music." 
            size="huge" 
            color="black"
            style={{cursor: "default"}}
            
          />
          </Grid.Column>

         <Grid.Column width={5} >
            <Search
            loading={isLoading}
            onResultSelect={(e, {result})=>{
                    setResult(result);
                    console.log(result);
                    // setRedirect(true);
                    if(result.type=="artist"){
                      setRedirectArtist(true);
                    }
                    else{
                      setRedirectTrack(true);
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
          </Grid.Column>
          <Grid.Column width={1}>
            <Button.Group>
            <Button onClick={()=>setRedirectHome(true)} inverted icon='home' color ='black' >
            </Button>
            <Button onClick={()=>setRedirectSettings(true)} inverted icon='settings' color ='black' >
            </Button>
            <Button inverted onClick={()=>{
              setRedirectLogout(true);
              setUser("");
            }} icon='arrow left' color ='black' >
              Logout
            </Button>
            <Button inverted onClick={()=>{
              setVisible(true);
            }} icon='arrow left' color ='black' >
              Menu
            </Button>
            </Button.Group>
            {/* <Button inverted icon='arrow left' color ='black' >
              Logout
            </Button> */}
          </Grid.Column>
          </Grid.Row>
          
            </Grid>
    </Segment>
         
          {redirectArtist ? <Redirect to={`/artist/${result.id}`} push={true} /> : ""}
          {redirectTrack ? <Redirect to={`/track/${result.id}`} push={true} /> : ""}
          {redirectLogout ? <Redirect to={`/`} push={true} /> : ""}
          {redirectSettings ? <Redirect to={`/settings`} push={true} /> : ""}
          {home ? <Redirect to={`/home/${user.id}/${accesstoken}/${refreshtoken}`} push={true} /> : ""}

          </div>
    
    );
  };

  export default PageHeader;