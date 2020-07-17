import axios from 'axios'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Container, Card,Search, Image, Icon, Grid } from 'semantic-ui-react'
import { Router, useParams } from 'react-router-dom';
import Spotify from 'spotify-web-api-js';
import FavoriteArtists from '../components/favartists'
import FavoriteSongs from '../components/favsongs'
import HomePagePosts from '../components/HomePagePosts'

import PageHeader from './pageheader'
import { InfoContext } from '../App'

const ReturnPreview = ({person}) => {
        const { attractedUsers, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshToken } = React.useContext(InfoContext);
      

        
        return (
                <div>
                       <Card>
    <Image src={person['datingimages'][Math.floor(Math.random()*3)]} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{person['name']}</Card.Header>

      <Card.Description>
                {/* {person['favoritesongs'].map(id=>s.gettr)} */}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
                </div>
        );

}
export default ReturnPreview