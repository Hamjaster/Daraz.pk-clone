
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SteppeR from '../select/SteppeR'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button, useConst } from '@chakra-ui/react'
import { Context } from '../../context/contextApi'
import { AiFillCreditCard, AiFillCalendar } from 'react-icons/ai'
import { BsKeyFill } from 'react-icons/bs'
import axios from 'axios'
import { showToast } from '../utils/Toast'

export default function Payment() {
    const { proxy, price, user, selectedCity, selectedCountry, selectedState, cart, setSelectedContry, setSelectedState, setSelectedCity, setCart } = useContext(Context)
    const Payref = useRef(null)
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [disabled, setdisabled] = useState(true)

    useEffect(() => {
        console.log(disabled)
    }, [disabled])

    const order = {
        shippingInfo: { Country: selectedCountry.value, State: selectedState.value, City: selectedCity.value },
        orderDetails: cart.map((product) => {
            return {
                name: product.name,
                img: product.img,
                quantity: product.quantity,
                price: product.price,
                product: product.id
            }
        }),
        totalPrice: price,
        user: user.id
    }

    const placeOrder = async (o) => {

        try {
            const { data } = await axios.post(`${proxy}/order/new`, o, {
                headers: {
                    'Authorization': `Bearer ${user.token} `
                }
            })
            console.log(data)
            if (data.success === true) {
                navigate('/success')
                localStorage.removeItem('cardInfo')
                setCart([])
                setSelectedContry({})
                setSelectedCity({})
                setSelectedState({})
            }
        } catch (error) {
            showToast('error', error)
            console.log(error)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.post(`${proxy}/payment`, {
                amount: Math.round(orderInfo.total * 100)
            })
            const client_secret = data.client_secret
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            city: selectedCity.value,
                            state: selectedState.value,
                            country: selectedCountry.iso
                        }
                    }
                }
            })
            if (result.error) {
                Payref.current.disabled = false
                console.log(result.error)
                setLoading(false)
            } else if (result.paymentIntent.status === 'succeeded') {
                placeOrder(order)
                setLoading(false)

            }
        } catch (error) {
            Payref.current.disabled = false
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <>
            {cart && cart[0]
                ? <div className='mx-auto my-10  '>
                    {/* Stepper */}
                    <SteppeR activeStep={2} />

                    <form onSubmit={handleSubmit} className="payment-box mt-32 space-y-7 mx-auto w-96  container flex flex-col">

                        <div className="px-12 space-x-5 card-no flex flex-row items-center justify-start w-full">
                            <div className='icon-pay text-3xl text-orange-900'>
                                <AiFillCreditCard />
                            </div>
                            <CardNumberElement onChange={(e) => {
                                setdisabled(!e.complete)
                            }} className='paymentInput' />
                        </div>

                        <div className="px-12 space-x-5 card-expirt flex flex-row items-center justify-start w-full">
                            <div className='icon-pay text-3xl text-orange-900'>
                                <AiFillCalendar />
                            </div>
                            <CardExpiryElement onChange={(e) => {
                                setdisabled(!e.complete)
                            }} className='paymentInput' />
                        </div>

                        <div className="px-12 space-x-5 card-cvc flex flex-row items-center justify-start w-full">
                            <div className='icon-pay text-3xl text-orange-900'>
                                <BsKeyFill />
                            </div>
                            <CardCvcElement onChange={(e) => {
                                setdisabled(!e.complete)
                            }} className='paymentInput' />
                        </div>

                        <Button isDisabled={disabled} isLoading={loading} marginX={12} colorScheme="orange" ref={Payref} type="submit">{`Pay - ${orderInfo.total} Rs`}</Button>

                    </form>


                </div>
                : <div className='text-center text-2xl font-medium'>
                    There are no Items in your CART
                </div>
            }
        </>

    )
}
