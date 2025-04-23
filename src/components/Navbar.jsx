import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Context/AuthContext/AuthContext';

const Navbar = () => {

    const { user, SignOut } = useContext(AuthContext);
    const [isImageError, setIsImageError] = useState(false);

    const logOutUser = () => {
        SignOut()
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error.code)
            })
    }

    const links = (
        <>
            <li><Link>Home</Link></li>
            <li><Link>Lost & Found</Link></li>
        </>
    )


    return (
        <div className='bg-blue-400 bg-opacity-80 rounded-xl w-11/12 mx-auto'>
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <h1 className='font-semibold text-lg'>Where<span>Is</span>IT</h1>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? (
                            <div className='w-full'>
                                {
                                    <div className='flex justify-end'>
                                        <h1 className="group relative flex h-6 w-6 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-500
                                                hover:w-full">
                                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-green-500 opacity-0 transition duration-500 group-hover:opacity-100 dark:from-blue-700 dark:to-green-600"></span>
                                            <span className="text-black text-xl transition-transform duration-300 group-hover:scale-0">
                                                {
                                                    user.photoURL && !isImageError ?
                                                        <div>
                                                            <img className='rounded-full h-6 sm:h-10'
                                                                src={user.photoURL}
                                                                onError={() => setIsImageError(true)}
                                                            />
                                                        </div>
                                                        :
                                                        <div>
                                                            <div>
                                                                <svg
                                                                    className='w-6'
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 448 512"
                                                                ><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" /></svg>
                                                            </div>
                                                        </div>
                                                }
                                            </span>

                                            <span className="absolute scale-0 text-white transition-transform duration-500 group-hover:scale-100 hover:opacity-100 w-full">
                                                <div className='w-full flex justify-between items-center'>
                                                    <h1 className='text-sm flex justify-center items-center pl-3 w-full'>{user.displayName?.split(' ').slice(0, 2).join(' ')}</h1>
                                                    <button onClick={() => logOutUser()} className='btn btn-xs rounded-e-full md:btn md:rounded-e-full'>Log Out</button>
                                                </div>
                                            </span>
                                        </h1>
                                    </div>
                                }
                            </div>
                        ) : (
                            <div className='navbar-end gap-1'>
                                <div className="">
                                    <Link to='/login'><h1 className="btn btn-xs md:btn dark:bg-slate-800 dark:text-white">Login</h1></Link>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;