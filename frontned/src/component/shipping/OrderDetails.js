import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../../context/contextApi'
import CartProduct from '../cart/CartProduct'
import axios from 'axios'
import hmjaa from './hmja.jpg'

export default function OrderDetails() {

    const id = useParams().id
    const { user, proxy } = useContext(Context)
    const [order, setOrder] = useState({})
    const [date, setDate] = useState('')

    const getOrder = async () => {
        try {
            const { data } = await axios.get(`${proxy}/order/find/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            console.log(data.order.orderDetails)
            console.log(data.order.orderDetails.length > 1)
            setOrder(data.order)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOrder()
    }, [])

    useEffect(() => {
        if (order) {
            const formattedDate = new Date(order.orderedAt)
            setDate(formattedDate.toLocaleString())
        }
    }, [order])



    return (
        <div className='orderDetails'>
            {order && order.orderDetails ?
                <div class="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">


                    <div class="flex justify-start item-start space-y-2 flex-col">
                        <h1 class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order #{order._id}</h1>
                        <p class="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                            {date.split(',')[0]} at {date.split(',')[1]}
                        </p>
                    </div>

                    <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">

                        <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">

                            <div class="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">

                                <p class="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>

                                {order.orderDetails && order.orderDetails.map((order) => {
                                    return (
                                        <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                            <div class="pb-4 md:pb-8 w-full md:w-40">
                                                <img class="w-full hidden md:block" src={order.img} alt="dress" />
                                                <img class="w-full md:hidden" src={order.img} alt="dress" />
                                            </div>
                                            <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                                <div class="w-full flex flex-col justify-start items-start space-y-8">
                                                    <h3 class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{order.name}</h3>

                                                </div>
                                                <div class="flex justify-between space-x-8 items-start w-full">

                                                    <p class="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{order.quantity <= 10 ? `0${order.quantity}` : order.quantity}</p>
                                                    <p class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">Rs. {order.price * order.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}


                            </div>

                            <div class="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">

                                <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                    <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                                    <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                        <div class="flex justify-between w-full">
                                            <p class="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                                            <p class="text-base dark:text-gray-300 leading-4 text-gray-600">Rs. {order.orderDetails &&
                                                order.orderDetails.length > 1 ?
                                                order.orderDetails.reduce((prev, curr) => {
                                                    return prev + (curr.price * curr.quantity)
                                                }, 0)
                                                : order.orderDetails[0].price
                                            }</p>
                                        </div>

                                        <div class="flex justify-between items-center w-full">
                                            <p class="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                                            <p class="text-base dark:text-gray-300 leading-4 text-gray-600">Rs. 110</p>
                                        </div>
                                    </div>
                                    <div class="flex justify-between items-center w-full">
                                        <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                                        <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                                            Rs. {order.orderDetails &&
                                                order.orderDetails.length > 1 ?
                                                order.orderDetails.reduce((prev, curr) => {
                                                    return prev + (curr.price * curr.quantity)
                                                }, 110)
                                                : order.orderDetails[0].price + 110
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div class="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                    <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
                                    <div class="flex justify-between items-start w-full">
                                        <div class="flex justify-center items-center space-x-4">
                                            <div class="w-8 h-8">
                                                <img class="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                                            </div>
                                            <div class="flex flex-col justify-start items-center">
                                                <p class="text-lg leading-6 dark:text-white font-semibold text-gray-800">Daraz Delivery<br /><span class="font-normal">Delivery with 24 Hours</span></p>
                                            </div>
                                        </div>
                                        <p class="text-lg font-semibold leading-6 dark:text-white text-gray-800">Rs. 110</p>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                            <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Maker</h3>
                            <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                                <div class="flex flex-col justify-start items-start flex-shrink-0">
                                    <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                        <img src={hmjaa} className='rounded-full w-10' alt="avatar" />
                                        <div class="flex justify-start items-start flex-col space-y-2">
                                            <p class="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">Hamza Shah</p>
                                            <p class="text-sm dark:text-gray-300 leading-5 text-gray-600">Made this Store</p>
                                        </div>
                                    </div>

                                    <div class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M3 7L12 13L21 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <p class="cursor-pointer text-sm leading-5 ">hamzashah.dev@gmail.com</p>
                                    </div>
                                </div>
                                <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                    <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                        <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                            <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                                            <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{order.shippingInfo.Country}, {order.shippingInfo.State}, {order.shippingInfo.City}</p>
                                        </div>
                                        <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                                            <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                                            <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{order.shippingInfo.Country}, {order.shippingInfo.State}, {order.shippingInfo.City}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <>l</>
            }
        </div>
    )
}
