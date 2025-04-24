import React from 'react';

const CardItems = ({data}) => {
    return (
        <div className="card bg-base-100 shadow-sm">
            <figure>
                <img
                    src={data.image}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{data.title}</h2>
                <p>{data.description}</p>
                <h1 className='flex items-center gap-2 font-semibold'>Type: <span className='badge badge-sm border-black'>{data.type}</span></h1>
                <h1 className='flex items-center gap-2 font-semibold'>Category: <span className='badge badge-sm border-black'>{data.category}</span></h1>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">View Details</button>
                </div>
            </div>
        </div>
    );
};

export default CardItems;