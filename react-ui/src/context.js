import React, { useEffect, createContext, useState } from 'react';
import { dbArtists, dbPosts, dbSongs, dbMessages } from './firebase/firebase';

const AppState = createContext(null);
const { Provider } = AppState;
const StateProvider = ({ children }) => {
  const [posts, setPosts] = useState('');
  const [artists, setArtists] = useState('');
  const [messages, setMessages] = useState('');
  const [songs, setSongs] = useState('');
  const [userid, setuserid] = useState('');
  const [accesstoken, setaccesstoken] = useState('');
  const [refreshtoken, setrefreshtoken]=useState('');
  useEffect(() => {
        const handleData = snap => {
          if (snap.val()) {
            setMessages(snap.val());
          }
        }
        dbMessages.on('value', handleData, error => alert(error));
        return () => { dbMessages.off('value', handleData); };
      }, []);
useEffect(() => {
        const handleData = snap => {
          if (snap.val()) {
            setPosts(snap.val());
          }
        }
        dbPosts.on('value', handleData, error => alert(error));
        return () => { dbPosts.off('value', handleData); };
      }, []);
useEffect(() => {
        const handleData = snap => {
          if (snap.val()) {
            setArtists(snap.val());
          }
        }
        dbArtists.on('value', handleData, error => alert(error));
        return () => { dbArtists.off('value', handleData); };
      }, []);
useEffect(() => {
        const handleData = snap => {
          if (snap.val()) {
            setSongs(snap.val());
          }
        }
        dbSongs.on('value', handleData, error => alert(error));
        return () => { dbSongs.off('value', handleData); };
      }, []);

      const api = {
              songs,
              posts,
              messages,
              artists,
              userid,
              setuserid,
              accesstoken,
              setaccesstoken,
              refreshtoken,
              setrefreshtoken,
        };
        return <Provider value={api}>{children}</Provider>;
      };
      
      export { AppState, StateProvider };