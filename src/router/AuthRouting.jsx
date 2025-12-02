import React, { useEffect } from 'react'
import LoginBackground from "../assets/images/login-right-background.png";
import SignupBackground from "../assets/images/signup-background.png";
import ForgotBackground from "../assets/images/forgot-password-background.png";
import OTPBackground from "../assets/images/otp-verification-background.png";
import CreatePasswordBackground from "../assets/images/create-password-background.png";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from '../pages/authPages/Login';
import Signup from '../pages/authPages/Signup';
import ForgotPassword from '../pages/authPages/ForgotPassword';
import OtpVerification from '../pages/authPages/OtpVerification';
import CreatePassword from '../pages/authPages/CreatePassword';
import { useSelector } from 'react-redux';


function AuthRouting() {
    const navigate = useNavigate()
    const location = useLocation();

    const { user } = useSelector(state => state.auth)
    const currentPath = location.pathname;

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user])

    const backgroundImages = {
        "/": LoginBackground,
        "/Signup": SignupBackground,
        "/ForgotPassword": ForgotBackground,
        "/OtpVerification": OTPBackground,
        "/CreatePassword": CreatePasswordBackground,
    }

    return (
        <div className="row login-container-row">
            <div className="col-md-5 no-padding login-background">
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/Signup" element={<Signup />} />
                    <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
                    <Route exact path="/OtpVerification" element={<OtpVerification />} />
                    <Route exact path="/CreatePassword" element={<CreatePassword />} />
                </Routes>
            </div>
            <div className="col-md-7 no-padding login-right-box">
                <div className="login-right-container">
                    <img src={backgroundImages[currentPath]} alt="Background image" />
                </div>
            </div>
        </div>
    )
}

export default AuthRouting