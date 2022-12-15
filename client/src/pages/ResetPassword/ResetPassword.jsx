import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AuthFooter from '../../components/Footer/AuthFooter';
import AuthHeader from '../../components/Header/AuthHeader';
import { resetPassword } from '../../redux/auth/action';
import toaster from '../../utility/toaster';

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
                    <input onChange={ e => setInput(e.target.value) } className="w-100" type="text" placeholder="New password" />
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