import React from 'react'
import { useSelector } from 'react-redux';
import Home from './home/Home';
import LogIn from './LogIn/LogIn';

const Index = () => {

    const { isLoggedIn } = useSelector(state => state.auth)
  return (
    <>
        {
            isLoggedIn ? <Home /> : <LogIn />
        }
    </>
  )
}

export default Index