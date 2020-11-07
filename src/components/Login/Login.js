import React from 'react'
import './Login.css';

import {auth, provider} from '../../firebase';

import {Button} from '@material-ui/core';

const Login = () => {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(error => alert(error.message));
    }

    return (
        <div className="login">
            <div className="login__logo">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/sco/thumb/9/98/Discord_logo.svg/1200px-Discord_logo.svg.png"
                    alt="Discord_logo" />
            </div>

            <Button onClick={signIn}>Sign in</Button>
        </div>
    )
}

export default Login
