import React from 'react'
import './Message.css';

import {useSelector} from 'react-redux';

import {Avatar} from '@material-ui/core';
import {Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import {selectUser} from '../../features/userSlice';

const Message = ({data, handleOnDeleteMessage}) => {

    const loggedUser = useSelector(selectUser);

    return (
        <div className="message">
            <Avatar src={data.user.photo} />
            <div className="message__info">
                <h4>
                    {data.user.displayName}
                    <span className="message__timestamp">
                        {new Date(data.timestamp?.toDate()).toUTCString()}
                    </span>
                </h4>
                <p>{data.message}</p>
            </div>
            {data.user.id === loggedUser.id && <DeleteIcon
                className="message__deleteIcon"
                onClick={handleOnDeleteMessage} />}
        </div>
    )
}

export default Message
