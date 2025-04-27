import React, { useContext, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import AuthContext from '../../Context/AuthContext/AuthContext';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';

Modal.setAppElement('#root')

const CardDetails = () => {

    const param = useParams()
    const cardInfo = useLoaderData();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { user } = useContext(AuthContext);

    const [isImageError, setIsImageError] = useState(false);


    const [startDate, setStartDate] = useState();


    function closeModal() {
        setModalIsOpen(false);
    }

    const handleDonate = (e) => {

        e.preventDefault();

        const form = e.target;
        const covered_location = form.coveredlocation.value;
        const covered_date = form.covereddate.value;

        const appeal_Name = user.displayName;
        const appeal_Email = user.email;
        const { image, title, type, description, category, date, location, hostemail, hostname } = cardInfo;

        const appeal_Data = { image, title, type, description, category, date, location, hostemail, hostname, appeal_Name, appeal_Email, covered_location, covered_date }


        if (cardInfo.status === "recovered") {
            Swal.fire({
                title: "This Item has Already Recovered",
                icon: "warning",
            });
            return;
        } else {

            fetch(`http://localhost:5000/items/${param.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ status: "recovered" })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.modifiedCount > 0) {
                        fetch("http://localhost:5000/recovereditems", {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify(appeal_Data)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                                if (data.insertedId) {
                                    Swal.fire({
                                        title: "Appeal Successfully",
                                        icon: "success",
                                        draggable: true
                                    });
                                }
                            })
                            .catch(error => {
                                Swal.fire({
                                    title: "Something Else",
                                    icon: "warning",
                                    draggable: true
                                });
                            })
                    } else {
                        Swal.fire({
                            title: "Something Else",
                            icon: "warning",
                            draggable: true
                        });
                    }


                })
                .catch(error => {
                    Swal.fire({
                        title: "Something Else",
                        icon: "warning",
                        draggable: true
                    });
                })
        }
    }


    return (
        <div>
            <div className="hero min-h-screen text-white">
                <div className="hero-content flex-col bg-blue-400 bg-opacity-90 text-black shadow-2xl mx-auto w-11/12 rounded-md my-5">
                    <img src={cardInfo.image} className="rounded-lg h-48 md:h-72" />
                    <div className='md:p-4 md:space-y-2 w-full'>
                        <h1 className="md:text-4xl lg:text-5xl font-bold">{cardInfo.title}</h1>
                        <p className="py-1 md:py-6">{cardInfo.description}</p>

                        <h1 className="md:text-lg pt-4">
                            <span className='font-medium md:text-xl'>Post Type:</span> <span className='badge badge-outline '>{cardInfo.type}</span>
                        </h1>

                        <h1 className="md:text-lg"><span className='font-medium md:text-xl'>Category:</span> <span className='badge badge-outline '>{cardInfo.category}</span></h1>

                        <h1 className="md:text-lg"><span className='font-medium md:text-xl'>{cardInfo.type} Date:</span> {cardInfo.date}</h1>

                        <h1 className="md:text-lg"><span className='font-medium md:text-xl'>{cardInfo.type} Location:</span> {cardInfo.location}</h1>

                        <h1 className="md:text-lg"><span className='font-medium md:text-xl'>Post_By:</span> {cardInfo.hostname}</h1>

                        <h1 className="md:text-lg"><span className='font-medium md:text-xl'>Post_From:</span> {cardInfo.hostemail}</h1>
                        <br />
                        <button onClick={() => setModalIsOpen(true)}
                            className="btn btn-primary w-full"
                        >
                            {cardInfo.type === "Lost" ? "Found This!" : "This is Mine!"}</button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-blue-600 w-3/5 mx-auto bg-white p-6 rounded-lg shadow-lg"
            >
                <div className='w-full'>
                    <h2 className='text-2xl font-bold text-center pb-5'>Fill Up The Information</h2>
                    {/* <button onClick={closeModal}>close</button> */}
                    <div className='flex justify-around border border-blue-500 px-1 py-4 rounded-lg'>
                        <div>
                            {
                                user.photoURL && !isImageError ?
                                    <div className='flex justify-center items-center'>
                                        <img className='rounded-full h-40'
                                            src={user.photoURL}
                                            onError={() => setIsImageError(true)}
                                        />
                                    </div>
                                    :
                                    <div className='h-40 flex justify-center items-center'>
                                        <svg
                                            className='w-6'
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        ><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" /></svg>
                                    </div>
                            }
                            <div className='pt-6'>
                                <h1 className='text-xl font-semibold text-center'>{user.displayName}</h1>
                                <h1 className='text-center font-medium'>{user.email}</h1>
                            </div>
                        </div>

                        <div>
                            <form onSubmit={(e) => { handleDonate(e); closeModal(); }}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            {
                                                cardInfo.type === "Lost" ? "Receive Address" : "Given Address"
                                            }
                                        </span>
                                    </label>
                                    <input type="text" name='coveredlocation' placeholder="Enter Your URL" className="input input-bordered bg-slate-700 text-white w-full dark:border-blue-500" required />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            {
                                                cardInfo.type === "Lost" ? "Receive Date" : "Given Date"
                                            }
                                        </span>
                                    </label> <br />
                                    <div>
                                        <DatePicker
                                            selected={startDate}
                                            name='covereddate'
                                            onChange={(date) => setStartDate(date)}
                                            className="input input-bordered w-full bg-slate-700 text-white border-blue-500"
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Click to select a date"
                                            wrapperClassName="w-full"
                                            minDate={new Date()}
                                        />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input value={user?.email} type="text" name="hostemail" className="input input-bordered w-full bg-slate-700 text-white dark:border-blue-500" required readOnly />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input value={user?.displayName} type="text" name="hostname" className="input input-bordered w-full bg-slate-700 text-white dark:border-blue-500" required readOnly />
                                </div>

                                <input className='btn btn-primary w-full mt-4' type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    );
};

export default CardDetails;