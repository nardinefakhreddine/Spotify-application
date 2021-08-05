import React from "react";
import { Redirect } from 'react-router-dom';

export const ProtectedRoute = (props) => {

    return sessionStorage.getItem('token') ? <props.render /> : <Redirect to='/' />
}