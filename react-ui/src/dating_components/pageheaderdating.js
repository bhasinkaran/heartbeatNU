import { Header, Segment, Grid, Icon, Search } from 'semantic-ui-react';
import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import _ from 'lodash'
import axios from 'axios'
import { InfoContext } from '../App'
import { Sidebar } from 'semantic-ui-react'
import { Button, Dropdown, Menu } from 'semantic-ui-react'




const PageHeaderDating = ({ access_token, id }) => {
  const { replies, setReplies, artists, visible, setVisible, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshToken } = React.useContext(InfoContext);
  const [activeItem, setActiveItem] = useState('');
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [result, setResult] = useState("");
  const [redirectLogout, setRedirectLogout] = useState(false);
  const [redirectSettings, setRedirectSettings] = useState(false);
  const [logout, setLogout] = useState(false);
  const [home, setRedirectHome] = useState(false);


  return (
    <div style={{marginBottom:"-10px"}} >
      {/* <Segment
      basic
      style={{ backgroundColor: "#1DB954", textAlign: "center", marginBottom: "10px" }}
      fluid="true">
        <Grid centered >
          <Grid.Row>
          <Grid.Column width={"5"}>
          <Header
            as={Link}
            to={`/dating/home/${access_token}/${id}`}
            inverted 
            content="UpNext" 
            size="huge" 
            color="black"
            style={{cursor: "default"}}
            
          />
          </Grid.Column>

         <Grid.Column width={5} >

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
             <Button inverted icon='arrow left' color ='black' >
              Logout
            </Button> 
          </Grid.Column>
          </Grid.Row>
          
            </Grid>
    </Segment>
          */}
      <Grid centered >
        <Grid.Row>
          <Grid.Column width='5'>
            <Header
              as={Link}
              to={`/dating/home/${user.id}/${access_token}/${id}`}
              content="UpNext"
              size='huge'
              color="purple"
              style={{marginLeft:"150px", marginTop:"120px" , textAlign:'center', cursor: "default" }}
              textAlign='center'
            />
          </Grid.Column>
          <Grid.Column width='11'>
            <Menu inverted color={'purple'} size='large' widths={4} >

              <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={() => setActiveItem('home')}
              />
              <Menu.Item
                name='messages'
                active={activeItem === 'messages'}
                onClick={() => setActiveItem('messages')}
              />
              <Menu.Item
                name='Matches'
                active={activeItem === 'matches'}
                onClick={() => setActiveItem('matches')}
              />

            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>



      {/* <Menu.Menu position='right'> */}
      {/* // <Dropdown item text='Language'>
          //   <Dropdown.Menu>
          //     <Dropdown.Item>English</Dropdown.Item>
          //     <Dropdown.Item>Russian</Dropdown.Item>
          //     <Dropdown.Item>Spanish</Dropdown.Item>
          //   </Dropdown.Menu>
          // </Dropdown>  */}

      {/* <Menu.Item>
            <Button primary>Sign Up</Button>
          </Menu.Item>
        </Menu.Menu> */}

      { redirectLogout ? <Redirect to={`/`} push={true} /> : "" }
  { redirectSettings ? <Redirect to={`/settings`} push={true} /> : "" }
  { activeItem === 'home' ? <Redirect to={`/dating/home/${user.id}/${accesstoken}/${refreshtoken}`} push={true} /> : "" }
  { activeItem === 'messages' ? <Redirect to={`/dating/messages`} push={true} /> : "" }

    </div >

  );
};

export default PageHeaderDating;