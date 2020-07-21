import axios from 'axios'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Container, Search, Grid } from 'semantic-ui-react'
import { Router, useParams, Link } from 'react-router-dom';
import Spotify from 'spotify-web-api-js';
import OverLapArtists from './PreviewComponents/OverLapArtists'
import OverLapSongs from './PreviewComponents/OverLapSongs'
// import HomePagePosts from '../components/HomePagePosts'
import MatchedPeople from './matchedpeople'
import ReturnPreview from './PreviewComponents/ReturnPreview'
import { Button } from 'semantic-ui-react'
import { InfoContext } from '../App'
import { dbChats } from '../firebase/firebase';