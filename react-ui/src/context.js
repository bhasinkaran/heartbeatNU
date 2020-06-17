import React, { useEffect, createContext, useState } from 'react';
import { dbArtists, dbPosts, dbSongs, dbMessages } from './firebase/firebase';



 
export const AppContext = createContext(null);