
import React, { useState, useRef } from 'react';
import { dbChats, dbMessages } from '../../firebase/firebase'
import { InfoContext } from '../../App'
import "./Messages.css"

const WriteMessage = ({ chatid }) => {
    const { chats, user } = React.useContext(InfoContext);
    const [value, setValue] = useState("");
    const refKey = useRef();

    function eventhandler(e) {
        if (e.key === 'Enter') {
            handleSubmitMessage();
        }
    }

    function handleSubmitMessage() {
        const messageref = dbMessages.push({
            'content': value,
            'senderid': user.id,
            'chatid': chatid,
            "createdAt": { '.sv': 'timestamp' }
        });
        const messageKey = messageref.getKey();

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
    )
}

export default WriteMessage;