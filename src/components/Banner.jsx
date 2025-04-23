import React, { useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import Spinner from '../Spinner/Spinner';

const Banner = () => {
    const images = [
        "https://i.ibb.co/BV9DTwhj/Slide1.jpg",
        "https://i.ibb.co/svvgGkbh/Slide2.jpg",
        "https://i.ibb.co/b5FPFjNB/Slide3.jpg",
        "https://i.ibb.co/HLV9vpkn/Slide4.jpg"
    ];

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1, slidesToSlide: 1 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1, slidesToSlide: 1 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 1, slidesToSlide: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 }
    };

    return (
        <div className='my-4'>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={2000}
                keyBoardControl={true}
            >
                {images.map((imageUrl, index) => (
                    <SlideWithLoader key={index} imageUrl={imageUrl} />
                ))}
            </Carousel>
        </div>
    );
};

const SlideWithLoader = ({ imageUrl }) => {
    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <div className='flex mx-auto relative'>
            {/* {loading && (
                <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-100 bg-opacity-50 rounded-xl'>
                    <Spinner />
                </div>
            )} */}
            <img
                // onLoad={handleImageLoad}
                className={`flex mx-auto border-4 border-blue-500 rounded-xl w-10/12 md:w-auto`} // Hide image while loading
                src={imageUrl}
                alt=""
            />
        </div>
    );
};

export default Banner;