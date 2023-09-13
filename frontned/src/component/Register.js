import React, { useState } from 'react'
import axios from 'axios'
import { Spinner } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { use } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Register() {
    const proxy = 'http://127.0.0.1:3000'
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pic, setPic] = useState('')
    const [loading, setLoading] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const uploadPic = (pic) => {

        setLoading(true)
        try {
            if (pic === undefined) {
                console.log("No pic found");
                setLoading(false)
            } else {
                const data = new FormData()
                data.append('file', pic)
                data.append('upload_preset', 'mernchatapp')
                data.append('cloud_name', 'daadraj4k')
                fetch('https://api.cloudinary.com/v1_1/daadraj4k/image/upload', {
                    method: 'post',
                    body: data
                }).then((res) => {
                    return res.json()
                }).then((result) => {
                    console.log(result);
                    setPic(result.url)
                    setLoading(false)

                }).catch((error) => {
                    console.log(error);
                    setLoading(false)
                })
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }

    }

    const register = async () => {
        try {
            const { data } = await axios.post(`${proxy}/user/register`, { name, email, password, pic })

            localStorage.setItem('userInfo', JSON.stringify(data));
            if (location.state?.redirect) {
                navigate(location.state.redirect);
            } else {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const registerAsGuest = async () => {
        try {
            const { data } = await axios.post(`${proxy}/user/login`,
                { email: 'guest@gmail.com', password: 'guest' })
            localStorage.setItem('userInfo', JSON.stringify(data));
            if (location.state?.redirect) {
                navigate(location.state.redirect);
            } else {
                navigate('/home');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>

            <section class="">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">

                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">

                            <form class="space-y-4 md:space-y-6">

                                {/* Name */}
                                <div>
                                    <label for="email" class="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white">Your name</label>
                                    <input value={name} onChange={(e) => {
                                        setName(e.target.value)
                                    }} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hamza Shah" required="" />
                                </div>

                                {/* Email */}

                                <div>
                                    <label for="email" class="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input value={email} onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>

                                {/* Password */}
                                <div>

                                    <label for="password" class="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white">Password</label>
                                    <input value={password} onChange={(e) => {
                                        setPassword(e.target.value)
                                    }} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>

                                {/* Picture */}
                                <div>

                                    <label for="password" class="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white">Upload Profile</label>
                                    <input onChange={(element) => {
                                        uploadPic(element.target.files[0])
                                    }} type="file" name="pic" id="pic" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" required="" />
                                </div>

                                <Button isLoading={loading}
                                    onClick={register} colorScheme='orange' w={'full'}>
                                    Create an account
                                </Button>

                                <Button isLoading={loading}
                                    onClick={registerAsGuest} colorScheme='blue' w={'full'}>
                                    Continue as Guest
                                </Button>

                            </form>

                        </div>
                    </div>
                </div >
            </section >

        </div >
    )
}
