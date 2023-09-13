import React, { useContext } from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom'
import { Context } from '../../context/contextApi';

export default function Product({ value, name, price, noOfreviews, img, id }) {
    const { Product, setProduct } = useContext(Context)


    return (
        <>
            <Link to={`/product/${id}`} className='px-5 mx-auto py-5'>
                <div className='cursor-pointer product shadow-md h-56 w-36 md:h-80 md:w-52  flex flex-col justify-between'>

                    <div style={{
                        backgroundImage: `url(${img})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',

                    }} className="img i h-[500px]">

                    </div>

                    <div className="text px-1 py-2 space-y-1 md:px-4 md:py-2 md:space-y-3 flex flex-col justify-between">

                        <div className="upper">
                            <div className="title font-semibold text-md md:text-lg">{name}</div>

                            <div className="price font-semibold text-orange-600 text-xl md:text-3xl">Rs. {price}</div>
                        </div>

                        <div className="reviews flex flex-row items-center space-x-1 text-gray-500">
                            <div className="ratings flex items-center">
                                <ReactStars {...{
                                    size: 20,
                                    value,
                                    edit: false
                                }} />
                            </div>
                            <div className="noOfreviews mt-1 ">{`(${noOfreviews})`}</div>
                        </div>

                    </div>

                </div>
            </Link>
        </>
    )
}
