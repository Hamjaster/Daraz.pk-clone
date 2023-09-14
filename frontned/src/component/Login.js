import React, { useContext, useState } from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
} from '@chakra-ui/react'
import axios from 'axios'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { auth, continueWithGoogle } from './firebase/Firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { AiOutlineGoogle } from 'react-icons/ai'
import { Context } from '../context/contextApi'

export default function Login() {
    const proxy = 'http://127.0.0.1:3000'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const provider = new GoogleAuthProvider()
    const { user, setUser } = useContext(Context)

    const login = async () => {
        try {
            const { data } = await axios.post(`http://localhost:5000/user/login`, { email, password })
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
                const { data } = await axios.post(`http://localhost:5000/user/google`, { name, email, pic })
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

                            <div class="space-y-4 md:space-y-6">
                                <div>
                                    <label for="email" class="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:orange-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white">Password</label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" required="" />
                                </div>


                                <button onClick={login} class="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Login</button>

                                <Button colorScheme='blue'
                                    onClick={continueWithGugle} w={'full'}>
                                    <div className="flex w-full flex-row justify-start space-x-20 items-center">
                                        <div className="text-2xl">
                                            <AiOutlineGoogle />
                                        </div>
                                        <span>Continue with Google</span>
                                    </div>
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
