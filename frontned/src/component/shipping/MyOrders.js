import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/contextApi'
import { MdShoppingCartCheckout } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import noorder from './noorder.jpg'
import { Button } from '@chakra-ui/react'
export default function MyOrders() {

    const { user, orders, setOrders, proxy } = useContext(Context)
    const navigate = useNavigate()
    const getOrders = async () => {
        console.log('hy')
        try {
            const { data } = await axios.get(`${proxy}/order/myorders`, {
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
        <>
            {orders && orders[0]
                ? <div className='flex w-5/6 mx-auto flex-col justify-start items-center border '>
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
                                <div className="name flex flex-col  font-medium">
                                    {order.orderDetails.length === 1
                                        ?
                                        <span>{order.orderDetails[0].name}</span>
                                        :
                                        order.orderDetails.map((details, idx) => {
                                            return (
                                                <div className=''>
                                                    {details.name} {idx + 1 !== order.orderDetails.length ? "," : ""}
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                                <div className="address font-light">Wah , Rawalpindi, Pakistan </div>
                                <div className="price"></div>
                                <Link to={`/order/${order._id}`} className="checkout cursor-pointer text-3xl">
                                    <MdShoppingCartCheckout />
                                </Link>
                            </div>
                        )
                    })}

                </div>
                : <div className='flex space-y-7 h-[80vh] w-full flex-col items-center justify-center'>
                    <div className="image w-80">
                        <img src={noorder} alt="" />
                    </div>
                    <div className="text-4xl font-sans text-orange-500 font-semibold">You've ordered nothing :(</div>
                    <Button onClick={() => {
                        navigate('/')
                    }} colorScheme={'orange'}>Go to Shop</Button>
                </div>
            }
        </>
    )
}
