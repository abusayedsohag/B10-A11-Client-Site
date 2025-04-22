import React from 'react';

const Register = () => {
    return (
        <div>
            <div className="hero bg-base-200">
                <div className="hero-content flex-row-reverse">
                    <div className="text-center hidden md:flex w-96 lg:text-left">
                        <Lottie animationData={loginlottie} loop={true} />
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold mb-4">Login now!</h1>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <div className="card-body">
                                <fieldset className="fieldset">
                                    <label className="label">Email</label>
                                    <input type="email" className="input" placeholder="Email" />
                                    <label className="label">Password</label>
                                    <input type="password" className="input" placeholder="Password" />
                                    <div><a className="link link-hover">Forgot password?</a></div>
                                    <button className="btn btn-neutral mt-4">Login</button>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;