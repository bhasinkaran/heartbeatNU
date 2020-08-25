import { Header,Container, Segment, Grid, Icon, Button, Search } from 'semantic-ui-react';
import React, { useState, useEffect, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import _ from 'lodash'
import axios from 'axios'
import {InfoContext} from '../../App'
const SearchbarSongs = () => {
        const { user, accesstoken, setUser} = React.useContext(InfoContext);
        
        const [value, setValue] = useState("");
        const [results, setResults] = useState([]);
        const [isLoading, setisLoading] = useState(false);
        const [result, setResult] = useState("");
        const [resultid, setResultID]=useState("");
        const [success, setSuccess]=useState(false);
        useEffect(()=>{
                var urlPost = process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/users/addsong/${user.id}/${resultid}` : `http://localhost:8888/users/addsong/${user.id}/${resultid}`;
                console.log("INSIDE");
                console.log(result);
                if(resultid!=""){
                        console.log(result);
                        axios({method:'post', url:urlPost, withCredentials: false})
                                .then(response => {
                                  console.log(response);
                                  setSuccess(true);
                                })
                                .catch(function (error) {
                                  console.log(error);
                                });
                }
        },[resultid]);
        async function handleSearchChange(valuee) {
                setisLoading(true);
                setValue(valuee);
                console.log(valuee);

                const urltrack = 'https://api.spotify.com/v1/search' + `?q=${encodeURIComponent(valuee)}` + "&type=track"

                const ressong = await axios.get(urltrack, {
                        headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                                'Authorization': 'Bearer ' + accesstoken
                        }
                });
                // console.log("this is res SONG",ressong);
                var max = ressong.data.tracks.items.length;
                var realistic = 10;
                var temp=[];
                if (max < realistic) {
                        realistic = max;
                }
                for (let i = 0; i < realistic; i++) {
                        let item = ressong.data.tracks.items[i];
                        console.log(item);
                        if (item.album.images[0]) {
                                temp.push({ title: item.name, image: item.album.images[0].url, description: item.album.name, price: item.popularity, id: item.id, type: "track" })

                        }
                        else {
                                //if no pictures just put a black picture
                                // temp.push({title: item.name, image: ", description: item.genres[0], price: item.popularity, id: item.id})
                                temp.push({ title: item.name, image: "https://images.unsplash.com/photo-1554050857-c84a8abdb5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80", description: item.album.name, price: item.popularity, id: item.id, type: "track" })

                        }
                }
                temp.sort((a, b) => {
                        if (a.price > b.price) {
                                return -1;
                        }
                        else {
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
                        <Container>

                       
                        <Search
                                loading={isLoading}
                                onResultSelect={(e, { result }) => {
                                        setResult(result);
                                        setResultID(result.id)
                                        var tempUser=user;
                                        tempUser.push(0,result.id);
                                        setUser(tempUser);
                                        console.log(result);

                                }}
                                onSearchChange={_.debounce((e, { value }) => handleSearchChange(value), 500, {
                                        leading: true,
                                })}
                                results={results}
                                value={value}
                                fluid
                                input={{ fluid: true }}
                        //     {...this.props}
                        />
                         </Container>
                </div>)
}
export default SearchbarSongs;