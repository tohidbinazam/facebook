import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AuthFooter from '../../components/Footer/AuthFooter';
import AuthHeader from '../../components/Header/AuthHeader';
import { resetPassword } from '../../redux/auth/action';
import toaster from '../../utility/toaster';
import { AiOutlineEye } from "react-icons/ai";

const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState('')

    const handleReset = (e) => {
        e.preventDefault();
        if (!input) {
            return toaster('Please give the password')
        }
        dispatch(resetPassword(input, navigate))
    }

    // Password view and hide
    const [type, setType] = useState(true);
    const togglePassword = () => {
        setType(!type);
    };
    

  return (
    <div>
        <AuthHeader />
        <div className="reset-area">
            <div className="reset-wrapper">
                <div className="reset-box">
                <div className="reset-box-header">
                    <span className="title">Choose a new password</span>
                </div>
                <div className="reset-body">
                    <p>
                    Create a new password that is at least 6 characters long. A strong
                    password has a combination of letters, digits and punctuation
                    marks.
                    </p>
                    <div className="code-box">
                    <input onChange={ e => setInput(e.target.value) } className="w-100" type={ type ? 'password' : 'text' } placeholder="New password" />
                    <AiOutlineEye onClick={ togglePassword } />
                    </div>
                </div>
                <div className="reset-footer">
                    <div></div>
                    <div className="reset-btn">
                    <Link className="cancel" to="/">Skip</Link>
                    <a className="continue" onClick={ handleReset } href="http">Continue</a>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <AuthFooter />
    </div>
  )
}

export default ResetPassword