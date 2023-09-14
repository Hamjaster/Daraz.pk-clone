import React, { useState, useEffect } from 'react'
import Register from '../component/Register'
import Login from '../component/Login'
import { axios } from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Form() {
    const [form, setform] = useState('register')
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (localStorage.getItem('userInfo')) {
            console.log(location.state)
            if (location.state?.redirect) {
                console.log('navigating to ', location.state.redirect)
                navigate(location.state.redirect);
                console.log('navigated to ', location.state.redirect)
            } else {
                // Default redirect if no location is specified
                console.log('navigating to /')
                navigate('/');
                console.log('navigated to /')
            }
        }
    }, [])

    return (


        <div className="form h-screen flex flex-col w-full pt-2 sm:pt-12 md:pt-24">

            <div className="flex mx-auto sm:max-w-md w-11/12 flex-row justify-center text-center items-center [&>span]:border [&>span]:w-full  [&>span]:p-3  [&>span]:text-lg   ">
                <span className={`hover:bg-gray-200  ${form === 'login' ? 'bg-gray-100  border-b-orange-600' : ''}`} onClick={() => setform('login')}>Login</span>
                <span className={`hover:bg-gray-200 ${form === 'register' ? 'bg-gray-100   border-b-orange-600' : ''} `} onClick={() => setform('register')}>Register</span>
            </div>

            <div className='h-80 '>
                {form === 'register' ?
                    <Register />
                    : <Login />
                }
            </div>
        </div>


    )
}
