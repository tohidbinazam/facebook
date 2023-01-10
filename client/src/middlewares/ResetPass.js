import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ResetPass = () => {
    const { reason } = useSelector(state => state.auth)
    return reason === 'reset-password' ? <Outlet /> : <Navigate to='/' />
}

export default ResetPass