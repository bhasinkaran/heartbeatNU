// import React, { useCallback, useEffect, useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import {useState} from 'react';
// import Spotify from 'spotify-web-api-js';
// const s = new Spotify();

// function App() {
//   const [message, setMessage] = useState(null);
//   const [isFetching, setIsFetching] = useState(false);
//   const [url, setUrl] = useState('/api');

//   const fetchData = useCallback(() => {
//     fetch(url)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`status ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(json => {
//         setMessage(json.message);
//         setIsFetching(false);
//       }).catch(e => {
//         setMessage(`API call failed: ${e}`);
//         setIsFetching(false);
//       })
//   }, [url]);

//   useEffect(() => {
//     setIsFetching(true);
//     fetchData();
//   }, [fetchData]);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         { process.env.NODE_ENV === 'production' ?
//             <p>
//               This is a production build from create-react-app.
//             </p>
//           : <p>
//               Edit <code>src/App.js</code> and save to reload.
//             </p>
//         }
//         <p>{'« '}<strong>
//           {isFetching
//             ? 'Fetching message from API'
//             : message}
//         </strong>{' »'}</p>
//         <p><a
//           className="App-link"
//           href="https://github.com/mars/heroku-cra-node"
//         >
//           React + Node deployment on Heroku
//         </a></p>
//         <p><a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a></p>
//       </header>
//     </div>
//   );

// }

// export default App;
import axios from 'axios'

import React, {useState} from 'react';

import logo from './logo.svg';
import './App.css';
import Spotify from 'spotify-web-api-js';
const s = new Spotify();

function App() {
  function getHashParams() {
    var x=4
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  var hashParams=getHashParams()
  var temp=false;
  if( hashParams.access_token )
  {
    temp=true;
    s.setAccessToken(hashParams.access_token)
  }


  const [loggedIn, setLoggedIn]=useState(temp)
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
 var redirectableLogin= process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/login` : `http://localhost:8888/login`;
  
 return (
    <div className="App">
     
    {!loggedIn ? 

     <a href= {redirectableLogin }>

      <button>Log in with spotify</button> 
      </a>:
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
    }
    </div>
  );
}

export default App;

//test for push