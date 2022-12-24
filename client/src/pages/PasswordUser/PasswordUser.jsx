import React from 'react'
import AuthFooter from '../../components/Footer/AuthFooter';
import AuthHeader from '../../components/Header/AuthHeader';
import avatar from '../../assets/images/profile_avatar.png'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { reasonAdd, resendCode } from '../../redux/auth/action';

const PasswordUser = () => {
    
    const { fs_name, sur_name, email, mobile, photo } = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    // Hide email middle letter
    const hideEmail = (email) => {
        const emailArr = email.split('')
        const hideEmail = emailArr.map((item, index) => {
            if(index > 2 && index < emailArr.length - 4) {
                return item = '*'
            } else {
                return item
            }
        })  
        return hideEmail.join('')
    }


    // Hide full phone number only visible last 2 digit
    const hideMobile = (mobile) => {
        const mobileArr = mobile.split('')
        const hideMobile = mobileArr.map((item, index) => {
            if(index < mobileArr.length - 2) {
                return item = '*'
            } else {
                return item
            }
        })
        return hideMobile.join('')
    }

    const forgotPass = (e) => {
        e.preventDefault()
        dispatch(reasonAdd('forgot-password'))
        navigate('/code-check')
        dispatch(resendCode('forgot-password'))
    }

  return (
    <div>
        <AuthHeader />
        <div className="reset-area">
            <div className="reset-wrapper">
                <div className="reset-box">
                <div className="reset-box-header">
                    <span className="title">Reset your password</span>
                </div>
                <div className="reset-body">
                    <div className="find-user-account">
                        {
                            <img src={ photo ?? avatar } alt="" />                                                 
                        }                    
                    <span>{ fs_name } { sur_name }</span>
                    { email && <b>{ hideEmail(email) }</b> }
                    { mobile && <b>{ hideMobile(mobile) }</b> }
                    <p>To reset your account password, please continue</p>
                    </div>
                </div>
                <div className="reset-footer">
                    <div></div>
                    <div className="reset-btn">
                    <Link className="cancel" to='/find-account'>Not you ?</Link>
                    <a className="continue" onClick={ forgotPass } href="http">Continue</a>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <AuthFooter />
    </div>
  )
}

export default PasswordUser