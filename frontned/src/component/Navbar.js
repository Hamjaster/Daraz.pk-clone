import React, { useContext, useEffect, useState, Suspense } from 'react'
import { Button, useDisclosure } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import icon from '../images/icon.png'
import { Avatar } from '@chakra-ui/react'
import { VscMenu } from 'react-icons/vsc'
import { AiOutlineClose } from 'react-icons/ai'
import { Context } from '../context/contextApi'

const CreateProductModal = React.lazy(() => import('./Product/CreateProductModal'))
const CartDrawer = React.lazy(() => import('./cart/CartDrawer'))

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { keyword, setKeyword, user, setUser, sidebar, setSidebar } = useContext(Context)
    const navigate = useNavigate()


    const logout = () => {
        setUser({})
        localStorage.removeItem('userInfo')
        navigate('/form')

    }
    return (



        <div className='flex  w-full text-md bg-orange-600 px-3 py-3 text-white space-x-4 flex-row justify-between items-center'>

            <div className="logo text-2xl font-bold">
                <img src={icon} alt="" srcset="" className='w-28' />
            </div>


            <input value={keyword} onChange={(e) => {
                setKeyword(e.target.value)
            }} className='outline-none border-none px-1 py-1 text-sm text-black sm:px-2 sm:py-2 sm:text-sm w-2/5' type="text" placeholder='Search items in Daraz.pk' />


            <div className="items hidden [&>div]:cursor-pointer  flex-col space-y-1 sm:space-y-0 md:flex sm:space-x-8 sm:flex-row justify-evenly items-start sm:items-center ">
                <Link to={'/'} className="item">Home</Link>
                <Link to={'/orders/me'} className="item">My Orders</Link>
                <div onClick={() => {
                    if (!user.name) {
                        navigate('/form')
                    } else {
                        onOpen()
                    }
                }} className="item">Create a Product</div>
                {user && user.name ?
                    <div onClick={logout} className='item'>Logout</div>
                    : <Link className='item' to={'/form'}>Login/Register</Link>
                }
                <div className="flex space-x-4 flex-row  items-center justify-center">
                    <div className="cart">
                        <Suspense>
                            <CartDrawer />
                        </Suspense>
                    </div>
                    <Avatar size={'sm'} name={user?.name} src={user?.pic} />
                </div>
            </div>

            <div onClick={() => {
                setSidebar(true)
            }} className='md:hidden text-3xl block'>
                <VscMenu />
            </div>

            {sidebar &&
                <div className="bg-orange-500 overflow-y-hidden z-50 text-white top-0 right-0 w-full h-full flex flex-col items-center justify-evenly text-3xl font-semibold fixed">
                    <div onClick={() => {
                        setSidebar(false)
                    }} className="absolute top-4 right-4">
                        <AiOutlineClose />
                    </div>
                    <Link onClick={() => {
                        setSidebar(false)
                    }} to={'/'} className="item">Home</Link>
                    <Link onClick={() => {
                        setSidebar(false)
                    }} to={'/orders/me'} className="item">My Orders</Link>
                    <div onClick={() => {
                        if (!user.name) {
                            navigate('/form')
                            setSidebar(false)
                        } else {
                            onOpen()
                            setSidebar(false)
                        }
                    }} className="item">Create a Product</div>
                    {user && user.name ?
                        <div onClick={() => {
                            logout()
                            setSidebar(false)
                        }} className='item'>Logout</div>
                        : <Link className='item' onClick={() => {
                            setSidebar(false)
                        }} to={'/form'}>Login/Register</Link>
                    }
                    <div className="flex text-4xl space-x-6 flex-row  items-center justify-center">
                        <div className="cart ">
                            <Suspense fallback={<>Rendering cart...</>}>
                                <CartDrawer mobile={true} />
                            </Suspense>
                        </div>
                        <Avatar size={'lg'} name={user?.name} src={user?.pic} />
                    </div>
                </div>
            }
            <Suspense fallback={<>Opening modal..</>}>
                <CreateProductModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
            </Suspense>
        </div>

    )
}
