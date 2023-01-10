import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const CodeSendCheck = () => {
    const { reason } = useSelector(state => state.auth)
    return reason === 'forgot-password' || reason === 'verify-account' ? <Outlet /> : <Navigate to='/' />
}

export default CodeSendCheck