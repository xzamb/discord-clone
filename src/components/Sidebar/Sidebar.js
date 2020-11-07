import React, {useState, useEffect} from 'react'
import './sidebar.css';

import {useSelector} from 'react-redux';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { Avatar } from '@material-ui/core';

import {selectUser, logout} from '../../features/userSlice';

import SidebarChannel from '../SidebarChannel/SidebarChannel';
import db, {auth} from '../../firebase';


const Sidebar = () => {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection("channels").onSnapshot(snapshotData => {
            setChannels(
                snapshotData.docs.map(doc => {
                    return {
                        uid: doc.id,
                        channel: doc.data()
                    };
                })
            );
        });
    }, []);

    const handleChannelPrompt = () => {
        const channelName = prompt("Type the channel name: ");

        if(channelName){
            db.collection("channels").add({
                channelName: channelName
            });
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>Discordia</h3>
                <ExpandMoreIcon/>
            </div>

            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon/>
                        <h3>Text channels</h3>
                    </div>
                    <AddIcon
                        onClick={handleChannelPrompt} 
                        className="sidebar__addChannel" />
                </div>

                <div className="sidebar__channelsList">
                  {channels.map(({uid, channel}) => {
                      return <SidebarChannel 
                                key={uid}
                                id={uid} 
                                channelName={channel.channelName}/>
                  })}
                </div>
            </div>

            <div className="sidebar__voice">
                <SignalCellularAltIcon
                    className="sidebar__pingIcon"
                    fontSize="large"/>

                <div className="sidebar__voiceInfo">
                    <h4>Voice Connected</h4>
                    <p>Stream</p>
                </div>

                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon/>
                    <CallIcon />
                </div>
            </div>
            
            <div className="sidebar__profile">
                <Avatar
                    onClick={() => auth.signOut()} 
                    src={user.photo}/>
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0,5)}</p>
                </div>

                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>

            </div>
        </div>

            
    )
}

export default Sidebar
