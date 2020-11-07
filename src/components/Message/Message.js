import React from 'react'
import './Message.css';

import {Avatar} from '@material-ui/core';
import {Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const Message = ({message, timestamp, user, handleOnDeleteMessage}) => {
    return (
        <div className="message">
            <Avatar src={user.photo} />
            <div className="message__info">
                <h4>
                    {user.displayName}
                    <span className="message__timestamp">
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                </h4>
                <p>{message}</p>
            </div>
            <DeleteIcon
                className="message__deleteIcon"
                onClick={handleOnDeleteMessage} />
        </div>
    )
}

export default Message
