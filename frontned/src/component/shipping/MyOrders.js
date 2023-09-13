import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/contextApi'
import { MdShoppingCartCheckout } from 'react-icons/md'
import { Link } from 'react-router-dom'
export default function MyOrders() {

    const { user, orders, setOrders } = useContext(Context)

    const getOrders = async () => {
        console.log('hy')
        try {
            const { data } = await axios.get('http://localhost:5000/order/myorders', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            console.log(data, 'dataa')
            setOrders(data.orders)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    useEffect(() => {
        console.log(orders)
    }, [orders])


    return (
        <div className='flex w-5/6 mx-auto flex-col justify-start items-center border '>
            <div className="order mb-2 font-medium w-full text-xl flex items-center flex-row justify-between px-4 py-2">
                <div className="id italic">ID</div>
                <div className="name ">NAME</div>
                <div className="address ">SHIPPING TO </div>
                <div className="checkout">
                    CHECK OUT
                </div>
            </div>


            {orders.map((order) => {
                return (
                    <div className="order space-y-2 sm:space-y-0 w-full text-xl flex items-center flex-col sm:flex-row border justify-between px-5 py-4">

                        <div className="id italic">{order._id}</div>
                        <div className="name   font-medium">{order.orderDetails.map((details, idx) => {

                            return (
                                <span className='mx-2'>
                                    {details.name} {idx + 1 !== order.orderDetails.length ? "," : ""}
                                </span>
                            )
                        })}</div>
                        <div className="address font-light">Wah , Rawalpindi, Pakistan </div>
                        <div className="price"></div>
                        <Link to={`/order/${order._id}`} className="checkout cursor-pointer text-3xl">
                            <MdShoppingCartCheckout />
                        </Link>
                    </div>
                )
            })}

        </div>
    )
}
