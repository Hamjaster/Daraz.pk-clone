import React, { useEffect } from 'react'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'
import { Link } from 'react-router-dom'

export default function OrderSuccess() {

    useEffect(() => {
        sessionStorage.removeItem('orderInfo')
    }, [])

    return (
        <div className='flex space-y-5 h-96 mx-10 flex-col items-center justify-center'>
            <div className='text-7xl text-orange-500'>
                <IoCheckmarkDoneCircle />
            </div>
            <div className="text-4xl text-center text-gray-500 font-semibold">
                Your Order has been placed successfully
            </div>
            <Link to={'/orders/me'} className="underline text-orange-500 text-xl">check my orders</Link>
        </div>
    )
}
