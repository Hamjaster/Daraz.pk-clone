import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/contextApi';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import ReactStars from "react-rating-stars-component";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { MdLocationOn, MdOutlineLocationOn } from 'react-icons/md'
import { CiDeliveryTruck } from 'react-icons/ci'
import { BsCashCoin } from 'react-icons/bs'
import { AddReviewModal } from '../AddReviewModal'
import { useDisclosure } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { showToast } from '../utils/Toast';


export default function ProductDetails() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { Product, setProduct, count, setCount, cart, setCart, openDrawer, openOrderModal, closeOrderModal, user } = useContext(Context)
    const [loading, setLoading] = useState(false)
    let { id } = useParams();
    const [quantity, setQuantity] = useState(1)
    const currentUser = JSON.parse(localStorage.getItem('userInfo'))
    const [hasUserReview, setHasUserReview] = useState(false);
    const navigate = useNavigate()


    const getProduct = async () => {

        console.log(id)
        setLoading(true)
        try {
            const { data } = await axios.get(`http://localhost:5000/product/${id}`)
            const reviews = data.product.reviews;
            setHasUserReview(reviews.some((review) => review.user === currentUser.id));
            setProduct(data.product)
            setLoading(false)
            console.log(data)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const addToCart = async (BUY) => {
        let isAlreadyInCart;
        try {
            const { data } = await axios.get(`http://localhost:5000/product/${id}`)

            if (cart && cart[0]) {
                console.log(data.product._id)
                isAlreadyInCart = cart.some((product) => {
                    console.log(product.id)
                    return product.id === data.product._id
                })
            }
            console.log(isAlreadyInCart)
            if (isAlreadyInCart) {
                showToast('warning', 'Product is already in cart')
            };

            setCart((c) => {
                return [...c, {
                    id: data.product._id,
                    name: data.product.name,
                    price: data.product.price,
                    img: data.product.Images[0].url,
                    quantity,
                }]
            })
            if (BUY) return;
            openDrawer()


        } catch (error) {
            showToast('error', error)
        }
    }

    useEffect(() => {
        getProduct()
        console.log(hasUserReview, 'si rev')
    }, [count])


    const stars = {
        size: 30,
        value: Product.rating,
        edit: false
    };
    const starsBIG = {
        size: 50,
        value: Product.rating,
        edit: false
    };


    return (
        <div className='details py-5 h-full bg-[#eff0f5]'>
            <ToastContainer
                position="top-right"
                autoClose={3001}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
            {loading ? (
                // Skeleton for loading
                <div className='card  mx-12 my-10 flex space-x-4'>
                    <div className="left w-1/2">
                        <Skeleton height='500px' />
                    </div>
                    <div className="right flex w-1/2  space-y-6 flex-col">
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='40px' width={'20%'} />
                        <div className="buttons mt-44 flex w-full space-x-6">
                            <Skeleton height='50px' width={'50%'} />
                            <Skeleton height='50px' width={'50%'} />
                        </div>
                    </div>

                </div>
            ) : Product && Product.Images ? (

                <>
                    {/* Main Product */}
                    <div className="card  md:mx-12 mx-5 sm:mx-5 bg-white my-10 flex flex-col sm:flex-row ">

                        <div className="img sm:px-8 px-4 py-1 sm:py-9 sm:w-1/2">

                            <Carousel>
                                {Product.Images.map((img) => {
                                    return (
                                        // <SwiperSlide key={img.id}>
                                        <img src={img.url} alt={img.altText} />
                                        // </SwiperSlide>
                                    );
                                })}
                            </Carousel>

                        </div>

                        <div className="info space-y-8 h-min px-4 sm:py-10 sm:w-1/2">

                            <div className="title font-medium text-4xl">{Product.name}</div>

                            <div className="reviews flex flex-row items-center space-x-1 text-gray-500">
                                <div className="ratings flex items-center">
                                    <ReactStars {...stars} />
                                </div>
                                <div className="noOfreviews mt-1 ">{`${Product.NoOfReviews} ratings`}</div>
                            </div>

                            <div className="price font-semibold text-5xl mt-10 text-orange-600">Rs. {Product.price} </div>

                            <div className="quantity space-x-10">
                                <span className='text-gray-600 text-xl'> Quantity</span>
                                <div className="operators inline-flex space-x-4">
                                    <button disabled={quantity === 0} onClick={() => {
                                        setQuantity(qu => qu - 1)
                                    }} className={`bg-slate-100 pb-2 transition px-4 py-1 text-xl cursor-pointer ${quantity === 0 ? 'cursor-default bg-slate-100 hover:bg-slate-100 text-gray-400' : ''}  hover:bg-slate-200 text-center rounded-md `}>-</button>
                                    <input className='w-10 text-center text-2xl' type='number' value={quantity} />
                                    <button disabled={quantity >= Product.stock} onClick={() => {
                                        setQuantity(qu => qu + 1)
                                    }} className={`bg-slate-100 pb-2 transition px-4 py-1 text-xl cursor-pointer ${quantity >= Product.stock ? 'cursor-default bg-slate-100 hover:bg-slate-100 text-gray-400' : ''} hover:bg-slate-200 text-center rounded-md`}>+</button>
                                </div>
                                <span className="stock text-green-500 font-bold">In Stock</span>
                            </div>

                            <div style={{ marginTop: '5rem' }} className="buttons mt-48 flex flex-row space-x-3 w-full">
                                <div onClick={() => {
                                    addToCart(true)
                                    navigate('/form', { state: { redirect: '/shipping' } })

                                }} className="button py-4 text-center text-xl w-1/2 gap-2 cursor-pointer hover:bg-orange-600 transition-all bg-orange-500 text-white ">Buy Now</div>
                                <div onClick={() => {
                                    addToCart(false)
                                }} className="button py-4 text-center text-xl w-1/2 gap-2 cursor-pointer hover:bg-blue-600 transition-all bg-blue-500 text-white ">Add to Cart</div>
                            </div>

                            <hr />

                            <div className="order-info space-y-5 ">

                                <div className="location flex flex-row space-x-5 items-center">
                                    <div className="icon text-3xl">
                                        <MdOutlineLocationOn />
                                    </div>
                                    <div className="address text-lg">Sindh, Karachi - Gulshan-e-Iqbal, Block 15</div>
                                </div>

                                <div className="delivery flex flex-row space-x-7 items-center">
                                    <div className="icon text-2xl">
                                        <CiDeliveryTruck />
                                    </div>
                                    <div className="address text-lg">Standard Delivery <span className='font-bold'>110 Rs.</span> </div>
                                </div>

                                <div className="cash flex flex-row space-x-7 items-center">
                                    <div className="icon text-2xl">
                                        <BsCashCoin />
                                    </div>
                                    <div className="address text-lg">Cash on Delivery Available</div>
                                </div>

                                <br />
                            </div>

                        </div>

                    </div>
                    {/* Product Description */}
                    <div className="desc px-5 py-5 bg-white sm:mx-12 mx-5 my-10">
                        <div className='text-2xl font-medium'>Product Description</div>
                        <p className='mt-5'>{Product.desc}</p>
                        <br />
                        <br />
                    </div>
                    {/* Product Reviews */}
                    <div className="reviews sm:mx-12 mx-5 px-5 py-5 my-10 bg-white">

                        <div className="comments relative">

                            {Product.reviews.length === 0 ?

                                <div className='text-2xl font-normal my-10 text-gray-400'>
                                    No Reviews for this Product
                                </div> :
                                <>
                                    {/* Reviews Banner */}
                                    <div className="container flex flex-row items-center justify-evenly" >
                                        <div className="rate">
                                            <span className='text-6xl'>{Product.rating}</span> <span className='text-gray-400 text-4xl'>/5</span>
                                        </div>
                                        <ReactStars {...starsBIG} />
                                        <div className="text-lg  text-gray-500">{Product.NoOfReviews} ratings</div>
                                    </div>

                                    <div className="line my-5 w-full h-[1px] bg-gray-300"></div>
                                    <span className='py-10 text-2xl font-medium'>Product Reviews</span>
                                    <div className="line mt-5 w-full h-[1px] bg-gray-300"></div>

                                    {/* Mapping through Reviews */}
                                    {Product.reviews.map((rv) => {

                                        return <div className='space-y-1 py-3 border-b-2'>

                                            <div><ReactStars {...{ value: rv.rating, size: 20, edit: false }} /></div>
                                            <div className='font-semibold text-gray-500'>
                                                {rv.user.toString() === JSON.parse(localStorage.getItem('userInfo')).id ?
                                                    <> by You </>
                                                    :
                                                    <> by {rv.name} </>}
                                            </div>
                                            <div className='text-lg'>{rv.comment}</div>

                                        </div>

                                    })}
                                </>
                            }

                            {/* Adding/Editing a review */}
                            <div onClick={() => {
                                if (!user.name) {
                                    navigate('/form')
                                } else {
                                    onOpen()
                                }
                            }} className='cursor-pointer adding-review underline text-orange-500 text-xl mt-4'>
                                {hasUserReview ?
                                    <>Edit Your Review</>
                                    : <>Add A Review</>}
                            </div>
                            <AddReviewModal hasUserReview={hasUserReview} setCount={setCount} isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
                        </div>

                    </div>
                </>

            ) : null}
        </div>
    )
}
