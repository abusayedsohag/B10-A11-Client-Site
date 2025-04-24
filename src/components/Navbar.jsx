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
            <li><Link to="/listitems">Lost & Found</Link></li>
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
                    <div className="dropdown dropdown-end">
                        {
                            user ?
                                <div>
                                    <div tabIndex={0} role="button" className="btn btn-xs md:btn-md btn-ghost btn-circle avatar">
                                        <div className="w-6 md:w-10 rounded-full">
                                            {
                                                user.photoURL && !isImageError ?
                                                    <div>
                                                        <img className='rounded-full h-6 md:h-10'
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
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                        <li className='bg-blue-500 rounded-md'>
                                            <div className="justify-between">
                                                <h1 className='text-white'>{user.displayName?.split(' ').slice(0, 2).join(' ')}</h1>
                                                <button onClick={logOutUser} className='btn btn-xs'>Log Out</button>
                                            </div>
                                        </li>
                                        <li><Link to="/additems">Add Lost & Found</Link></li>
                                        <li><Link>All Recovered Items</Link></li>
                                        <li><Link>Manage My Items</Link></li>
                                    </ul>
                                </div>
                                :
                                <div>
                                    <div className="">
                                        <Link to='/login'><h1 className="btn btn-xs md:btn dark:bg-slate-800 dark:text-white">Login</h1></Link>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;