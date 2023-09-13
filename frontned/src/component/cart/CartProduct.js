import { Button } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { MdDelete } from 'react-icons/md'
import { Context } from '../../context/contextApi'

export default function CartProduct({ name, price, img, quantity, id }) {
    const { setCart, cart } = useContext(Context)
    return (
        <div className='bg-[#eff0f5] py-4 px-2 relative group flex flex-row space-x-3'>

            {/* Image */}
            <div className="img">
                <img src={img} className='w-36' alt="" srcset="" />
            </div>

            {/* Product Data */}
            <div className="info pr-8 flex flex-col justify-evenly">

                <div className="name text-md font-medium">{name}</div>
                <div className="price text-lg font-semibold text-orange-500">Rs. {price}</div>
                <div className="quantity">Quantity : <span className='font-semibold'>{quantity}</span>  </div>
                <div className="total text-2xl">
                    <span className='font-medium text-xl'>Total Price :</span>
                    <span className='text-orange-500 font-semibold'> Rs. {price * quantity}</span>
                </div>

            </div>

            {/* Remove Product */}
            <div onClick={() => {
                setCart(cart.filter((product) => {
                    return product.id !== id;
                }))
            }} className="absolute hidden group-hover:block cursor-pointer text-red-500 bottom-3 right-2 text-2xl remove">
                <MdDelete />
            </div>
        </div>
    )
}
