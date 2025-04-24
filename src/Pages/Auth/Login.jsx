import React, { useContext, useState } from 'react';
import Lottie from "lottie-react";
import loginlottie from '../../../public/login.json'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { signInWithPopup } from 'firebase/auth';
import auth from '../../Firebase/firebase.init';

const Login = () => {

    const { existingUser, googleSignIn, githubSignIn, facebookSignIn } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const navigate = useNavigate()


    const handleShow = (active) => {
        setShow(active)
    }


    const handleSignIn = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const userInfo = { email, password }

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            toast.error('Password must have at least one uppercase ,lowercase, and at least 6 characters long.');
            return;
        }

        console.log(userInfo)

        existingUser(email, password)
            .then(res => {
                toast.success('Login Success')
                navigate('/')
            })
            .catch(error => {
                toast.error('Invalid Credential')
            })
    }

    // Social Login
    const handleSocialSignIn = (signInProvider) => {
        signInWithPopup(auth, signInProvider)
            .then(res => {
                console.log(res)
                toast.success('Login Success')
                navigate('/')
            })
            .catch(error => {
                console.log(error.code)
                toast.error('Something Error')
            })
    }

    const googleSign = () => {
        handleSocialSignIn(googleSignIn)
    }

    const githubSign = () => {
        handleSocialSignIn(githubSignIn)
    }

    const facebookSign = () => {
        handleSocialSignIn(facebookSignIn)
    }


    return (
        <div>
            <ToastContainer />
            <div className="hero bg-base-200 md:min-h-screen">
                <div className="hero-content flex-row-reverse">
                    <div className="text-center hidden md:flex w-80 lg:text-left">
                        <Lottie animationData={loginlottie} loop={true} />
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold mb-4 text-center">Login now!</h1>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <form onSubmit={handleSignIn} className="card-body">

                                <label className="label">Email</label>
                                <input type="email" name='email' className="input" placeholder="Email" />

                                <div className='form-control'>
                                    <label className="label">Password</label>
                                    <div className='flex items-center'>
                                        <input type={show ? 'text' : 'password'} name='password' className="input" placeholder="Password" />
                                        <button type='button' onClick={() => handleShow(!show)} className='absolute right-9 z-10'>
                                            {
                                                show ?
                                                    <div className='w-4'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" /></svg>
                                                    </div>
                                                    :
                                                    <div className='w-4'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" /></svg>
                                                    </div>
                                            }
                                        </button>
                                    </div>
                                </div>

                                <div className="link link-hover">Forgot password?</div>

                                <input type="submit" className="btn btn-neutral mt-4" value="Login" />

                                <h1>I have no Account. <Link to="/register" className='font-semibold text-red-600 underline'>Register Now</Link></h1>
                                <div className='flex justify-between items-center'>
                                    <hr className='w-2/5' />
                                    Or
                                    <hr className='w-2/5' />
                                </div>
                                <div className='flex justify-evenly items-center'>
                                    <button type='button' onClick={googleSign} className='w-8'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                                        </svg>
                                    </button>

                                    <button type='button' onClick={githubSign} className='w-8'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>
                                    </button>

                                    <button type='button' onClick={facebookSign} className='w-8'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" /></svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;