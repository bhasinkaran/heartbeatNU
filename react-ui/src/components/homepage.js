import axios from 'axios'
import {Map, Marker,Popup, TileLayer} from 'react-leaflet';
import React, {useState} from 'react';
import {Router , useParams} from  'react-router-dom'
import Spotify from 'spotify-web-api-js';
const s = new Spotify();

const Homepage = () =>{
  var {id, acces_token } = useParams();
    s.setAccessToken(acces_token)
  const[nowPlaying, setNowPlaying]=useState({name: "not checked",image:""})
  const [artists,setArtists]=useState(['None'])
  function getNowPlaying(){
    s.getMyCurrentPlaybackState()
      .then((response)=>{
        // console.log(response)
        setNowPlaying({
          name: response.item.name,
          image: response.item.album.images[0].url
        })
      }
      )
  }
  function getTopArtists(){
    s.getMyTopArtists()
    .then((response)=>{
      console.log(response)
      
      setArtists(response.items)

    })
  }

  axios.get(`http://localhost:8888/users/${id}`)
      .then(response => {
       console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })



  function CheckLocation(){
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position);
    })
  }
  
 return (
    <div className="App">
     <div id="map"></div>
     <button onClick = {()=>CheckLocation()}>
        geolocation test
      </button>
      <Map center={[23,-24]} zoom={12}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[12,23]}>
            <Popup>
              <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
            </Popup>
          </Marker>
        </Map>

      <div>
      <div> Now Playing {nowPlaying.name}
      </div>
      <div>
        <img src={nowPlaying.image} width="250" >
        </img>
      </div>
      <div>{artists.map(obj=>obj['name'])}
      </div>
      <button onClick={()=>getNowPlaying()}>
        Check Now Playing
      </button>
      <button onClick={()=>getTopArtists()}>
        Check Top Artists
      </button>

      </div>
    
    </div>
  );
}

export default Homepage;
