import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Container, Header, Divider, Grid, Loader, Button, Image, TextArea } from 'semantic-ui-react'
import { Router, useParams, Link } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { InfoContext } from '../App'
import ReturnChats from './ChatsComponents/ReturnChats'
import ReturnStartChat from  './ChatsComponents/ReturnStartChat'
import { dbChats, dbMessages } from '../firebase/firebase';
import WriteMessage from './ChatsComponents/WriteMessage';
import $ from 'jquery'

const ChatsHomepage = () => {
        const { user, users, allusers, chats, messages } = React.useContext(InfoContext);
        const [activeItem, setActiveItem] = useState("");
        const [relevantChats, setRelevantChats] = useState([]);
        const[otherpersonid, setOtherId]= useState("");

        useEffect(() => {
                if (user && users) {
                        setRelevantChats(Object.values(users[user.id]['chats']));
                }
        }, [user, users])
        useEffect(() => {
                if (relevantChats.length > 0) {
                        setActiveItem(relevantChats[0]);
                }
        }, [relevantChats])
        useEffect(()=>{
                if(chats[activeItem]){
                        if(chats[activeItem]['person2'] == user.id ) {
                                setOtherId(chats[activeItem]['person1'])
                                console.log(chats[activeItem]['person1'])
                        }
                        else{
                                setOtherId(chats[activeItem]['person2']);
                                console.log(chats[activeItem]['person2']);
                                } 
                        
                }
               
        },[chats,activeItem])
        
        useEffect(()=>{
                var element = document.getElementById("myDivID");

                if(element){
                        console.log("NO ELEMENT")
                        window.scrollTo(0,element.offsetHeight);

                }
                // $('html, body').animate({
                //         scrollTop: parseInt($("#myDivID").offset().top
                //     }, 2000);
                    $('#myDivID').scrollTop($('#myDivID').scrollHeight);

        },[])


        if (user && users && chats && allusers&&activeItem)
                return (
                        <div>
                                
                                <Segment >
                                        {/* style={{ overflow: 'auto', maxHeight: 200 }} */}
                                        <Grid columns={2}>
                                                <Grid.Column width={3}>
                                                <Menu pointing vertical>
                                                {relevantChats.map(chatid => {
                                                        // console.log(allusers)
                                                        var otherid = chats[chatid]['person2'] == user.id ? chats[chatid]['person1'] : chats[chatid]['person2'];
                                                        console.log(otherid);
                                                        var obj = allusers.find(item => item.id == otherid)
                                                        // console.log(obj);
                                                        console.log(obj);
                                                        // console.log(otherid);

                                                        return (
                                                        <Menu.Item
                                                                name={obj['fname']}
                                                                active={activeItem === chatid}
                                                                onClick={() => setActiveItem(chatid)}
                                                        />)
                                                })}

                                        </Menu>

                                                </Grid.Column>
                                                <Grid.Column width={13}>
                                                <Segment fluid>
                                        {allusers && otherpersonid? <Image avatar size='small' src={allusers.find(item => item.id == otherpersonid).datingimages[0]} /> : ""}
                                        {allusers && otherpersonid? <span style={{'marginLeft':"10px", fontSize:"15"}}>{allusers.find(item => item.id == otherpersonid).fname}</span> : ""}
                                </Segment>
                                                        <Segment  id="myDivID" style={{minHeight:"450px",maxHeight:"450px", "overflow-y":"auto", "scrollTop":"450px"}} >
                                                                {/* fluid */}
                                                                {chats[activeItem]['chats'] ? 
                                                                                 <ReturnChats otherpersonid={otherpersonid} chatid={activeItem}/> 
                                                                                : 
                                                                                <ReturnStartChat chatid={activeItem} />}
                                                                
                                                        </Segment>
                                                        <Segment fluid>
                                                               <WriteMessage chatid={activeItem}/>
                                                        </Segment>
                                                        
                                                       
                                                </Grid.Column>
                                        </Grid>
                                        

                                </Segment>
                        </div>
                )
        else {
                return <div>Not loaded</div>
        }
}

export default ChatsHomepage;