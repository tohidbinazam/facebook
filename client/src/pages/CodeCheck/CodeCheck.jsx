import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthFooter from '../../components/Footer/AuthFooter';
import AuthHeader from '../../components/Header/AuthHeader';
import { resendCode } from '../../redux/auth/action';

const CodeCheck = () => {

    const dispatch = useDispatch()

   const { email, mobile } = useSelector(state => state.auth.user)

   const handleResend = (e) => {
        e.preventDefault()
        dispatch(resendCode())
    }

  return (
    <div>
        <AuthHeader />
        <div className="reset-area">
            <div className="reset-wrapper">
                <div className="reset-box">
                <div className="reset-box-header">
                    <span className="title">Enter security code</span>
                </div>
                <div className="reset-body">
                    <p>
                    Please check your emails or number for a message with your code. Your code
                    is 6 numbers long.
                    </p>
                    <div className="code-box">
                    <input type="number" />
                    <div className="code-text">
                        <span>We sent your code to: </span>
                        <span>{ email || mobile }</span>
                    </div>
                    </div>
                </div>
                <div className="reset-footer">
                    <a onClick={ handleResend } href="http">Resend code</a>
                    <div className="reset-btn">
                    <Link className="cancel" to="/">Cancel</Link>
                    <a className="continue" href="http">Continue</a>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <AuthFooter />
    </div>
  )
}

export default CodeCheck