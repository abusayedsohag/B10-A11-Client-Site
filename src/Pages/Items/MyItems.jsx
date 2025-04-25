import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Context/AuthContext/AuthContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyItems = () => {

    const { user } = useContext(AuthContext);
    const [myitems, setMyItems] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/host_items?email=${user.email}`)
            .then(res => res.json())
            .then(item => {
                setMyItems(item)
            })
    }, [])

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/host_items/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                            const deleteCampaigns = myitems.filter(fil => fil._id !== id)
                            setMyItems(deleteCampaigns)
                        }
                        else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                            });
                        }

                    })
            }
        });
    }

    return (
        <div className='w-11/12 mx-auto my-6'>
            {
                myitems.length === 0 ? (
                    <div className="text-center p-10 bg-slate-100 dark:bg-slate-800 rounded text-gray-500 dark:text-gray-300">
                        <h1 className="text-xl font-semibold">No Campaigns Found</h1>
                        <p className="text-sm mt-2">You haven't created any campaigns yet.</p>
                        <Link to="/addCampaigns">
                            <button className="mt-4 btn btn-sm btn-primary">Add New Campaign</button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto bg-slate-100 dark:bg-slate-800 dark:text-white hidden md:block">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className='dark:border-b-blue-500 dark:text-white'>
                                        <th>My Items</th>
                                        <th>Items Category</th>
                                        <th>Date</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myitems?.map(camp => (
                                            <tr key={camp._id} className='dark:border-b-blue-500'>
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={camp.image} alt={camp.title} />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{camp.title}</div>
                                                            <div className="text-sm opacity-50">Type : {camp.type}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h1 className="badge badge-outline badge-sm dark:text-white">{camp.category}</h1>
                                                </td>
                                                <td>
                                                    <h1>{camp.date}</h1>
                                                </td>
                                                <th>
                                                    <Link to={`/updateitem/${camp._id}`}><button className="btn btn-primary btn-xs">Update</button></Link>
                                                </th>
                                                <th>
                                                    <button onClick={() => handleDelete(camp._id)} className="btn btn-error btn-xs">Delete</button>
                                                </th>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/* For small screens (mobile) */}
                        <div key={myitems._id} className="grid md:hidden">
                            {myitems?.map((camp) => (
                                <div key={camp._id}>
                                    <div className="bg-white dark:bg-slate-800 dark:text-white p-4 flex flex-col gap-2">
                                        <div className="flex items-center gap-4">
                                            <img src={camp.image} alt={camp.title} className="w-12 h-12 object-cover rounded" />
                                            <div>
                                                <h2 className="font-bold">{camp.title}</h2>
                                                <p className="text-sm text-gray-500">{camp.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="badge badge-outline badge-xs dark:text-white">{camp.type} --&gt; {camp.category}</span>
                                            {/* <span className="badge badge-outline badge-xs dark:text-white">{camp.category}</span> */}
                                            <span className="font-semibold">Date: <span className='font-normal text-xs'>{camp.date} BDT</span></span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <Link className='btn btn-primary btn-xs w-1/2 rounded-e-full' to={`/updateitem/${camp._id}`}><button>Update</button></Link>
                                            <button onClick={() => handleDelete(camp._id)} className="btn btn-error btn-xs w-1/2 rounded-s-full">Delete</button>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default MyItems;