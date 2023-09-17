import React, { useContext, useEffect } from 'react'
import { Context } from '../../context/contextApi'
import CartProduct from '../cart/CartProduct'
import {
    Button,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import SteppeR from '../select/SteppeR'

export default function ConfirmOrder() {

    const { selectedCity, selectedState, selectedCountry, number, cart, user } = useContext(Context)

    useEffect(() => {
        console.log(user.name)
        console.log(selectedCity, selectedState, selectedCountry)
    }, [])



    const navigate = useNavigate()
    const subtotal = cart.reduce((prev, current) => {
        return prev + (current.quantity * current.price)
    }, 0)
    const shippingPrice = 110;
    const total = subtotal + shippingPrice;
    const address = `${selectedCountry}, ${selectedState}, ${selectedCity}`

    const proceedToPayment = () => {
        sessionStorage.setItem('orderInfo', JSON.stringify({
            subtotal,
            total,
            address
        }))
        navigate('/shipping/payment')
    }

    return (
        <>
            {cart && cart[0]
                ? <div className='shipping my-10 mx-auto '>
                    <SteppeR activeStep={1} />

                    <div className='flex mt-20 flex-col sm:flex-row md:mx-28 sm:mx-12 mx-5'>

                        {/* Details */}
                        <div className="details mb-20 border-gray-300 pr-4 sm:border-r-[1px] sm:w-2/3 w-full flex flex-col space-y-10  ">
                            {/* Shipping Info */}
                            <div className="ship space-y-7">
                                <span className='text-4xl font-semibold'>Shipping Info</span>
                                <div className=" font-light text-xl flex flex-col">

                                    <div className="">
                                        <span className='font-medium'>Name : </span>
                                        {user.name}
                                    </div>
                                    <div className="">
                                        <span className='font-medium'>Phone : </span>
                                        +{selectedCountry?.no} {number}
                                    </div>
                                    <div className="">
                                        <span className='font-medium'>Address : </span>
                                        {selectedCountry.value}, {selectedState.value}, {selectedCity.value}
                                    </div>

                                </div>
                            </div>
                            {/* Order details */}
                            <div className="order space-y-7">

                                <span className='text-4xl font-semibold'>Your Cart Items</span>

                                <div className="products space-y-5">
                                    {cart.map((product) => {
                                        return <CartProduct
                                            name={product.name} img={product.img} price={product.price} quantity={product.quantity} id={product.id}
                                        />
                                    })}
                                </div>

                            </div>
                        </div>

                        {/* Order summary */}
                        <div className="summary sm:ml-10 pb-3 justify-start flex flex-col items-center sm:w-1/3 w-full">

                            <span className='font-semibold text-3xl'>Order Summary</span>
                            <div className="w-full h-[1px] my-7 bg-gray-300"></div>
                            <div className="data space-y-6 w-full" >

                                <div className="flex w-full text-lg flex-row justify-between">
                                    <span className='font-semibold'>Subtotal</span>
                                    <span>Rs {subtotal}</span>
                                </div>

                                <div className="flex w-full text-lg flex-row justify-between">
                                    <span className='font-semibold'>Shipping Charges</span>
                                    <span>Rs 110</span>
                                </div>

                                <div className="flex w-full text-lg flex-row justify-between">
                                    <span className='font-semibold'>GST</span>
                                    <span>FREE</span>
                                </div>

                                <div className="w-full text-center h-[1px] my-10 bg-gray-300"></div>

                                <div className="flex w-full text-2xl flex-row justify-between">
                                    <span className='font-semibold'>Total</span>
                                    <span className='font-semibold'>Rs {total}</span>
                                </div>

                                <Button onClick={proceedToPayment} colorScheme='orange' width={'100%'}>Proceed with Payment</Button>

                            </div>
                        </div>
                    </div>

                </div>
                : <div className='text-center mt-12 text-orange-500 text-2xl font-medium'>
                    There are no Items in your CART
                </div>
            }
        </>

    )
}
