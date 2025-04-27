import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Cards = () => {

    const cards = useLoaderData()

    return (
        <div className='w-11/12 mx-auto bg-blue-500 p-4 bg-opacity-60 rounded-md'>
            <h1 className='text-4xl font-bold text-center text-yellow-400 p-2'>Letest Lost and Found Items</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4'>
                {
                    cards.map(card => (

                        <div key={card._id} className="card bg-base-100 shadow-sm h-[400px]">
                            <figure className='h-2/5'>
                                <img
                                    src={card.image}
                                    alt="Shoes"
                                    className='w-full' />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{card.title}</h2>
                                <p>{card.description}</p>
                                <h1 className='flex items-center gap-2 font-semibold'>Type: <span className='badge badge-sm border-black'>{card.type}</span></h1>
                                <h1 className='flex items-center gap-2 font-semibold'>Category: <span className='badge badge-sm border-black'>{card.category}</span></h1>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">View Details</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Cards;