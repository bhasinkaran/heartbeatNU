// import axios from 'axios'
// import { Redirect } from 'react-router-dom'
// import _ from 'lodash'
// import React, { useState, useEffect, useContext } from 'react';
// import { Container, Search, Grid, Loader } from 'semantic-ui-react'
// import { Router, useParams } from 'react-router-dom';
// import Spotify from 'spotify-web-api-js';
// import FavoriteArtists from '../components/favartists'
// import FavoriteSongs from '../components/favsongs'
// import HomePagePosts from '../components/HomePagePosts'

// import PageHeader from './pageheaderdating'
// import { InfoContext } from '../App'
// import ReturnPreview from './PreviewComponents/ReturnPreview'

// const MatchedPeople = () => {
//         const { attractedUsers, user, setUser, orderedAttracted, accesstoken, setAccesToken, refreshtoken, setRefreshToken } = React.useContext(InfoContext);
//         const [index, setIndex] = useState(0);
//         console.log(orderedAttracted[index])
        
//         if(orderedAttracted)
//         return (
//                 <Container>
//                         {orderedAttracted.length>index ? <ReturnPreview person={orderedAttracted[index]} />: 
//                         "No matches yet."}
                        
//                 </Container>
//         );
//         else{
//                 return(<Loader></Loader>)
//         }

// }
// export default MatchedPeople