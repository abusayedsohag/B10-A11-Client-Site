import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import AuthContext from '../../Context/AuthContext/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddItems = () => {

    const { user } = useContext(AuthContext);

    const [startDate, setStartDate] = useState(new Date());

    const handleAdd = (e) => {
        e.preventDefault();

        const form = e.target;

        const type = form.type.value;
        const image = form.image.value;
        const title = form.title.value;
        const category = form.category.value;
        const location = form.location.value;
        const date = form.date.value;
        const hostemail = form.hostemail.value;
        const hostname = form.hostname.value;
        const description = form.description.value;

        const newPost = { type, image, title, category, location, date, hostemail, hostname, description }

        console.log(newPost)

        fetch('http://localhost:5000/items', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newPost)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Successfully Added",
                        icon: "success",
                        draggable: true
                    });
                    form.reset();
                }
            })
    }

    return (
        <div>
            <div className="hero min-h-screen py-6">
                <div className="hero-content flex-col md:w-11/12 bg-blue-400 bg-opacity-50 md:p-10 rounded-md">
                    <div className="text-center">
                        <h1 className="bg-white p-3 rounded-md text-2xl md:text-4xl lg:text-5xl font-bold ">Add Lost & Found Items</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 dark:bg-slate-800 dark:text-white">
                        <form onSubmit={handleAdd} className="card-body grid grid-cols-1 md:grid-cols-2 gap-x-11 gap-y-4">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Post Type</span>
                                </label>
                                <select defaultValue="select" name='type' className="select w-full label bg-slate-700 text-white dark:border-blue-500">
                                    <option value="select" className='label-text' disabled>Pick your Post Type</option>
                                    <option value="Lost">Lost</option>
                                    <option value="Found">Found</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Thumbnail</span>
                                </label>
                                <input type="url" name='image' placeholder="Enter Your URL" className="input input-bordered bg-slate-700 text-white w-full dark:border-blue-500" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" name='title' placeholder="Title" className="input input-bordered w-full bg-slate-700 text-white dark:border-blue-500" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select defaultValue="Select Category" name='category' className="select label bg-slate-700 text-white border-blue-500 w-full">
                                    <option value="Select Category" className='label-text' disabled>Select Category</option>
                                    <option value="Pets">Pets</option>
                                    <option value="Document">Document</option>
                                    <option value="Gadgets">Gadgets</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Jewelry">Jewelry</option>
                                    <option value="Bags">Bags</option>
                                    <option value="Toys">Toys</option>
                                    <option value="Keys">Keys</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input type="text" name="location" placeholder='Lost or Found Area Location
                                ' className="input input-bordered w-full bg-slate-700 text-white dark:border-blue-500" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Select a Date:</span>
                                </label> <br />
                                <div>
                                    <DatePicker
                                        selected={startDate}
                                        name='date'
                                        onChange={(date) => setStartDate(date)}
                                        className="input input-bordered w-full bg-slate-700 text-white border-blue-500"
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Click to select a date"
                                        wrapperClassName="w-full"
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Host Email</span>
                                </label>
                                <input value={user?.email} type="text" name="hostemail" className="input input-bordered w-full bg-slate-700 text-white dark:border-blue-500" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Host Name</span>
                                </label>
                                <input value={user?.displayName} type="text" name="hostname" className="input input-bordered w-full bg-slate-700 text-white dark:border-blue-500" required />
                            </div>

                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea className='textarea w-full dark:border-blue-500 bg-slate-700 text-white' placeholder='Description' name="description"></textarea>
                            </div>

                            <div className="form-control mt-6 md:col-span-2">
                                <input className='btn btn-secondary w-full' type="submit" value="Add Post" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddItems;