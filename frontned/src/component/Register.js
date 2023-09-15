import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Spinner } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { use } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { auth, continueWithGoogle } from './firebase/Firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { AiOutlineGoogle } from 'react-icons/ai'
import { Context } from '../context/contextApi'

export default function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pic, setPic] = useState('')
    const [loading, setLoading] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const provider = new GoogleAuthProvider()
    const { user, setUser, proxy } = useContext(Context)

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
            const { data } = await axios.post(`${proxy}/register`, { name, email, password, pic })

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

    const continueWithGugle = async () => {
        try {
            const { user } = await signInWithPopup(auth, provider)
            if (!user) return;
            var name = user.displayName
            var email = user.email
            var pic = user.photoURL

            console.log(user)
            if (!name && !email) return;
            try {
                const { data } = await axios.post(proxy, { name, email, pic })
                console.log(data)
                localStorage.setItem('userInfo', JSON.stringify(data));
                setUser(data)
                if (location.state?.redirect) {
                    navigate(location.state.redirect);
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.log(error);
            }

        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                // User closed the popup without signing in
                console.log('User closed the sign-in popup');
            } else {
                // Other error occurred
                console.error('Error signing in:', error);
            }
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

                                <Button colorScheme='blue' isLoading={loading}
                                    onClick={continueWithGugle} w={'full'}>
                                    <div className="flex w-full flex-row justify-start space-x-20 items-center">
                                        <div className="text-2xl">
                                            <AiOutlineGoogle />
                                        </div>
                                        <span>Continue with Google</span>
                                    </div>
                                </Button>

                            </form>

                        </div>
                    </div>
                </div >
            </section >

        </div >
    )
}
