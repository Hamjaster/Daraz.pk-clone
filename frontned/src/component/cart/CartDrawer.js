import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Context } from '../../context/contextApi'
import CartProduct from './CartProduct'
import { useNavigate } from 'react-router-dom'

export function CartDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const navigate = useNavigate()
    const { cart, setCart, isDrawerOpen, closeDrawer, openDrawer } = useContext(Context)

    const checkOutHandler = () => {
        navigate('/form', { state: { redirect: '/shipping' } })
        closeDrawer()
    }

    useEffect(() => {
        console.log(cart.map(c => console.log(c.img)))
    }, [cart])


    return (
        <>
            <div className="cart text-2xl" onClick={openDrawer}>
                <AiOutlineShoppingCart />
            </div>
            <Drawer
                isOpen={isDrawerOpen}
                placement='right'
                onClose={closeDrawer}
                finalFocusRef={btnRef}
                size={'md'}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Your Shopping Cart</DrawerHeader>
                    {cart && cart[0] ?
                        <>
                            <DrawerBody>
                                <div className="products space-y-5">
                                    {cart.map((product) => {
                                        return <CartProduct id={product.id} name={product.name} price={product.price} img={product.img} quantity={product.quantity} />
                                    })}
                                </div>
                            </DrawerBody>

                            <div className="bg-orange-500 h-1 w-full"></div>
                            <DrawerFooter>
                                <div className='flex w-full space-y-3 flex-col'>

                                    <div className="total  w-full justify-between font-medium text-3xl flex flex-row">
                                        <span>Gross Total  </span>
                                        <span className='text-orange-500 font-semibold'>
                                            Rs {cart.reduce((prev, current) => {
                                                return prev + (current.quantity * current.price)
                                            }, 0)}
                                        </span>
                                    </div>
                                    <Button onClick={checkOutHandler} colorScheme='orange'>
                                        Check Out
                                    </Button>

                                </div>
                            </DrawerFooter>
                        </>
                        :
                        <div className="text-3xl mt-10 text-center self-center text-orange-500">
                            You dont have anything in cart
                        </div>
                    }
                </DrawerContent>
            </Drawer>
        </>
    )
}