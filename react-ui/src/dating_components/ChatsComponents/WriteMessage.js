
import React, { useState, useRef } from 'react';
import { dbChats, dbMessages } from '../../firebase/firebase'
import { InfoContext } from '../../App'
import "./Messages.css"

const WriteMessage = ({ chatid }) => {
    const { chats, user } = React.useContext(InfoContext);
    const [value, setValue] = useState("");
    const refKey = useRef();
    function eventhandler(e) {
        // console.log(e);
        if (e.key === 'Enter') {
            handleSubmitMessage();

        }
        //  console.log("Works outside");
    }

    function handleSubmitMessage() {
        // console.log(document.getElementById("textareareply").value);
        const messageref = dbMessages.push({
            'content': value,
            'senderid': user.id,
            'chatid': chatid,
            "createdAt": { '.sv': 'timestamp' }
        });
        const messageKey = messageref.getKey();
        // console.log("Likes key is ", likeskey);

        dbChats.child(chatid).child('chats').push(messageKey);
        setValue("")
    }



    return (
        <form className="writeMessage">
            <input
                className="writeMessageInput"
                placeholder="Type a message..."
                type="text"
                value={value}
                onChange={(e) => setValue   (e.target.value)}
            />
            <button 
                className="writeMessageButton"
                type="submit"
                onClick={handleSubmitMessage}
                onKeyUp={(e) => eventhandler(e)}>
                    Send
            </button>
        </form>

        //   <div fluid>
        //           <TextArea fluid onKeyUp={(e) => eventhandler(e)} ref={refKey} id="textareareply" value={value} onChange={(e)=>{
        //             setValue(e.target.value);
        //             // console.log(e.target.value);
        //           }} rows={2} placeholder='Write a message...' /> 
        //           {/* <Form.Button fluid positive onClick = {()=>handleSubmitReply()} style={{marginTop:"10px"}}>Reply</Form.Button>  */}
        //  </div>
    )
}

export default WriteMessage;