import React, { useContext, useEffect, useState } from 'react'
import CreateProductModal from './Product/CreateProductModal'
import { Button, useDisclosure } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../context/contextApi'
import { CartDrawer } from './cart/CartDrawer'
import icon from '../images/icon.png'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { keyword, setKeyword, user, setUser } = useContext(Context)
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


            <div className="items [&>div]:cursor-pointer  flex-col space-y-1 sm:space-y-0 flex sm:space-x-8 sm:flex-row justify-evenly items-start sm:items-center ">
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
                        <CartDrawer />
                    </div>
                    <Avatar size={'sm'} name={user?.name} src={user?.pic} />
                </div>
            </div>

            <CreateProductModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        </div>
    )
}
