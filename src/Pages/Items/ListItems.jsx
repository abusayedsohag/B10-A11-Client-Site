import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CardItems from './CardItems';

const ListItems = () => {

    const itemList = useLoaderData();

    return (
        <div className='w-11/12 min-h-80 mx-auto bg-blue-500 bg-opacity-50 p-2 rounded-md my-2'>
            <h1 className='text-4xl font-bold text-center text-white'>Lost and Found Items</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4'>
                {
                    itemList.map(data => <CardItems key={data._id} data={data}></CardItems>)
                }
            </div>
        </div>
    );
};

export default ListItems;