import React from 'react';
import { Redirect } from 'react-router-dom';
import './login.css';

function LoginPage  ()  {
    let Spotify_URL =
        'https://accounts.spotify.com/authorize?client_id=89475f052c9a4a76aa47cd738c2c08d5&response_type=token&state=123&redirect_uri=http://localhost:3000&scope=user-read-private%20user-read-email';

    let token = localStorage.getItem('token');
    if (token) return <Redirect to='/' />;

    return (
        <div className='login-page-container'>
            <a href={Spotify_URL} className='login-link' style={{textDecoration:'none'}}>
                <div className='login-link-container'>
                    <nav>Login</nav>
                    <span className='iconify' data-icon='mdi:spotify'></span>
                </div>
            </a>
        </div>
    );
};

export default LoginPage;
