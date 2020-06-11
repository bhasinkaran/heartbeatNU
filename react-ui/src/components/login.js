
import React, {useState} from 'react';



const Login = () =>{
  
 var redirectableLogin= process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/login` : `http://localhost:8888/login`;
  
 return (
  
    <div >
      

     <a href= {redirectableLogin }>
    
      <button>Log in with spotify</button> 
      </a> 
      </div>
      
  );
}

export default Login;
