import React, { useContext, useEffect, useState } from 'react'
import Product from './Product'
import ReactStars from "react-rating-stars-component";
import { Carousel } from 'react-responsive-carousel'
import axios from 'axios';
import { Context } from '../../context/contextApi';
import Slider from '@material-ui/core/Slider';
import InfiniteScroll from 'react-infinite-scroll-component';
import { VscDebugRestart } from 'react-icons/vsc';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { MdTroubleshoot } from 'react-icons/md';

export default function Products() {
    const [products, setProducts] = useState([])
    const { count, keyword, category, setCategory, categories, user, proxy } = useContext(Context)
    const [value, setValue] = useState([0, 5000]);
    const [loading, setLoading] = useState(false)

    const getAllProducts = async () => {

        setLoading(true)
        let link = `${proxy}/product?keyword=${keyword}&category=${category}&price[gte]=${value[0]}&price[lte]=${value[1]}`
        console.log(link)
        try {
            const { data } = await axios.get(link)
            console.log(data)
            setProducts(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    useEffect(() => {
        getAllProducts()
    }, [count, keyword, category, value])


    const handleChange = (event, newValue) => {
        console.log(newValue)
        setValue(newValue);
    };


    return (
        <div className='mt-11 mx-4 '>

            {/* All product Filters */}
            <div className="flex flex-col md:flex-row filters items-center sm:px-5 relative bg-[#eff0f5] rounded-lg text-gray-600 ">

                <div className="price w-full md:w-auto space-x-1 md:space-x-3  flex flex-col-reverse items-center">

                    <div className="font-medium w-full text-center text-md hidden sm:block#4R5EAAAADwz R sm:text-xl ">Select Price</div>
                    <div className="slider md:mt-3 w-10/12 md:w-44  mx-auto">
                        <Slider
                            getAriaLabel={() => 'Price range'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="on"
                            min={0}
                            max={5000}
                        />
                    </div>

                </div>

                <div className="categories py-0 pb-9 sm:py-0 sm:pb-9 md:pb-0 w-full justify-evenly flex flex-row [&_.image]:w-28 [&_div]:cursor-pointer  ">

                    {categories.map((c) => {
                        return <div onClick={(e) => {
                            setCategory(c.name)
                        }} className={`${category === c.name ? 'border-b border-b-orange-500' : ''}  img sm:py-5 sm:px-1 lg:px-6   space-y-2  items-center flex flex-col`}>
                            <img src={c.img} className='w-12 sm:w-16 md:w-24' alt="" />
                            <div className="text-[10px] sm:text-[12px] lg:text-lg mx-auto font-semibold text-center">{c.name}</div>
                        </div>
                    })}

                </div>
                <div onClick={(e) => {
                    setCategory('')
                    setValue([0, 25000])
                }} className="absolute text-orange-500 cursor-pointer text-md underline bottom-1 left-5 mb-1">
                    <div className='text-orange-500 text-xl sm:text-2xl'>
                        <VscDebugRestart />
                    </div>
                </div>
            </div>

            {/* All Products here */}
            {loading
                ? <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 lg:mx-20 py-10">
                    <Skeleton height='16rem' width='13rem' />
                    <Skeleton height='16rem' width='13rem' />
                    <Skeleton height='16rem' width='13rem' />
                    <Skeleton height='16rem' width='13rem' />
                    <Skeleton height='16rem' width='13rem' />
                    <Skeleton height='16rem' width='13rem' />
                    <Skeleton height='16rem' width='13rem' />
                    <Skeleton height='16rem' width='13rem' />
                    <Skeleton height='16rem' width='13rem' />
                    <Skeleton height='16rem' width='13rem' />
                    <Skeleton height='16rem' width='13rem' />
                    <Skeleton height='16rem' width='13rem' />

                </div>
                :
                <div className=" grid mx-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center justify-center lg:mx-20 my-10">

                    {products && products.map((product) => {
                        return <Product key={product._id} id={product._id} name={product.name} value={product.rating} price={product.price} img={product.Images[0].url} noOfreviews={product.NoOfReviews} />
                    })}

                </div>
            }

        </div>
    )
}
