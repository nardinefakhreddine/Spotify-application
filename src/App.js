import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import Artists from './pages/Artists';
import Albums from './pages/Albums';
import { Navbar } from './components/navbar';

function App() {
    
   
    const url = new URL(window.location.href).hash;
    console.log(url);

    
    let access_token = url
        .split('#').pop().substring(url.indexOf('='), url.indexOf('&token_type') - 1);
    
    
    
    if (url.includes('access_token')) {
        localStorage.setItem('token', access_token);
    }

    let token = localStorage.getItem('token');
    return (
        <>
            <BrowserRouter>
               <Navbar/>
                <Switch>
                    <Route
                        exact
                        path='/login'
                        component={() => <LoginPage authenticated={token} />}
                    />
                    <ProtectedRoute exact path='/:id' render={(props) => <Albums {...props} />} />
                    <ProtectedRoute exact path='/' render={(props) => <Artists {...props} />} />
                   
                </Switch>
               
            </BrowserRouter>
        </>
    );
};

export default App;
