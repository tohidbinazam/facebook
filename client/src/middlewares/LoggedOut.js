import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const LoggedOut = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
    return !isLoggedIn ? <Outlet /> : <Navigate to='/' />
}

export default LoggedOut