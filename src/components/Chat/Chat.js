import React, {useState, useEffect} from 'react'

import {useSelector} from 'react-redux';
import firebase from 'firebase';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import ChatHeader from '../ChatHeader/ChatHeader';
import './Chat.css';
import Message from '../Message/Message';

import {selectChannelName, selectChannelId} from '../../features/appSlice';
import {selectUser} from '../../features/userSlice';
import firebaseDatabase from '../../firebase';

const Chat = () => {

    const user = useSelector(selectUser);
    const channelName = useSelector(selectChannelName);
    const channelId = useSelector(selectChannelId);

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
       if(!channelId) return;

       firebaseDatabase.collection("channels")
       .doc(channelId).collection("messages")
       .orderBy("timestamp", "asc")
       .onSnapshot(snapshot => {
           setMessages(
                snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        data: doc.data()
                    }
                })
           );
       });

    }, [channelId]);


    const handleSendMessage = e => {
        e.preventDefault();

        if(!input.trim()) return;

        firebaseDatabase.collection("channels") 
            .doc(channelId)
            .collection("messages")
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user,
                message: input
            });

        setInput('');
    }


    const handleDeleteMessage = ({id}) => {
        firebaseDatabase.collection("channels")
            .doc(channelId)
            .collection("messages")
            .doc(id)
            .delete();
    }

    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>

            <div className="chat__messages">
                {messages.map(message => {
                    return <Message
                        handleOnDeleteMessage={() => handleDeleteMessage(message)}
                        data={message.data}
                    />
                })}
            </div>

            <div className="chat__input">
                <AddCircleIcon fontSize="large" />
                <form>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        disabled={!channelId} 
                        placeholder={`Message for #${channelName ?? ''}`} />
                    <button
                        onClick={handleSendMessage}
                        disabled={!channelId}
                        className="chat__inputButton" 
                        type="submit">Send message</button>
                </form>

                <div className="chat__inputIcons">
                    <CardGiftcardIcon fontSize="large" />
                    <GifIcon fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}

export default Chat
