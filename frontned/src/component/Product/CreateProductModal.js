import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    Textarea,
} from '@chakra-ui/react'
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { BsPlusCircle } from 'react-icons/bs'
import { IoIosCloseCircle } from 'react-icons/io'
import axios from 'axios'
import { handleImageRemove, handleImageUpload } from '../Cloudinary';
import { Context } from '../../context/contextApi';
import { showToast } from '../utils/Toast';


const formatResult = (item) => {
    return (
        <>
            <span>{item.name}</span>
        </>
    )
}

export default function CreateProductModal({ isOpen, onClose, onOpen }) {
    const { count, setCount, categories, proxy } = useContext(Context)
    const ref = useRef(null)
    const [Images, setImages] = useState([])
    const [category, setcategory] = useState('')
    const [Name, setName] = useState('')
    const [desc, setdesc] = useState('')
    const [price, setPrice] = useState()
    const [loading, setLoading] = useState(false)
    const [stock, setStock] = useState(1)
    const [urls, setUrls] = useState([])
    const [thmbnail, setThmbnail] = useState([])

    const handleOnSearch = (string, results) => {
        console.log(string, results);
    };

    const handleOnHover = (result) => {
        console.log(result);
    };

    const handleOnSelect = (item) => {
        console.log(item);
        setcategory(item.name)
    };

    const handleOnFocus = () => {
        console.log("Focused");
    };

    const handleOnClear = () => {
        console.log("Cleared");
    };

    const createProduct = async () => {
        if (!Name || !price) {
            showToast('error', 'You have left fields missing')
        } else {

            try {
                const { data } = await axios.post(`${proxy}/product/create`, {
                    name: Name,
                    price,
                    desc,
                    category,
                    Images,
                    stock
                })
                console.log(data)
                setName('')
                setPrice(0)
                setImages([])
                handleOnClear()
                setdesc('')
                setLoading(false)
                onClose()
                setCount(count + 1)
                showToast('success', 'Your Product is live!')
            } catch (error) {
                console.log(error)
                setLoading(false)
                showToast('error', error)
            }
        }
    }


    useEffect(() => {
        console.log(Images, 'url')
    }, [Images])


    return (
        <div>

            <Modal isCentered closeOnOverlayClick={false} size={'5xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <div className="content mb-10">
                    <ModalContent>
                        <div className='text-3xl sm:text-4xl md:text-5xl  px-7 py-1 sm:py-5 text-orange-700 font-normal m-5' >Become Daraz seller by selling Products</div>
                        <ModalCloseButton />

                        <ModalBody>
                            <div className="mbody pb-24 px-7 py-1 sm:py-4 mt-6 space-y-5">

                                {/* Name, Price, Category and Description */}
                                <div className="text space-y-10">

                                    <div className="one flex flex-col sm:flex-row justify-between sm:space-x-5 space-y-2 sm:space-y-0">

                                        <div className="name sm:w-2/4 w-11/12">
                                            <span className='text-xl font-semibold w-1/4'>Name :  </span>
                                            <input onChange={(e) => {
                                                setName(e.target.value)
                                            }} value={Name} className='border w-full px-3 py-2 text-lg' />
                                        </div>

                                        <div className="price sm:w-1/4 w-11/12">
                                            <span className='text-xl font-semibold w-1/4'>Price :  </span>
                                            <div class="flex">
                                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                                    RS
                                                </span>
                                                <input onChange={(e) => {
                                                    setPrice(e.target.value)
                                                }} value={price} type='number' id="website-admin" class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1500" />
                                            </div>


                                        </div>

                                        <div className="categoy [&_.wrapper]:border-black    sm:w-1/4 w-11/12">
                                            <span className='text-xl font-semibold w-1/4'>
                                                Category :
                                            </span>

                                            <ReactSearchAutocomplete
                                                items={categories}
                                                onSearch={handleOnSearch}
                                                onHover={handleOnHover}
                                                onSelect={handleOnSelect}
                                                onFocus={handleOnFocus}
                                                autoFocus
                                                formatResult={formatResult}
                                                styling={{
                                                    borderRadius: 'none',
                                                    boxShadow: 'none',
                                                    border: '1px solid #e2e8f0',
                                                    lineColor: 'gray',
                                                    zIndex: '100',
                                                    fontSize: '18px'
                                                }}
                                            />

                                        </div>

                                        <div className="stock sm:w-1/4 w-11/12">
                                            <span className='text-xl font-semibold w-1/4'>
                                                Stock :
                                            </span>
                                            <input onChange={(e) => {
                                                setStock(e.target.value)
                                            }} value={stock} type='number' id="website-admin" class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="elonmusk" />
                                        </div>
                                    </div>

                                    <div className="two">
                                        <span className='text-xl font-semibold'>Description :  </span>
                                        <Textarea _focus={{ borderColor: 'orange.200' }} onChange={(e) => {
                                            setdesc(e.target.value)
                                        }} value={desc} placeholder='Add description of your product' />
                                    </div>
                                </div>

                                {/* Images */}
                                {Images &&
                                    <>
                                        <div className='font-semibold text-xl'>Add Images (upto 5)</div>
                                        <div className="images flex flex-row flex-nowrap space-x-3">

                                            {/* Show Images */}
                                            {Images.map((img) => {
                                                return (
                                                    <div className='w-44 relative flex items-center  img group'>
                                                        <img className='' src={img.secure_url} alt="images" srcset="" />
                                                        <div onClick={() => handleImageRemove(img.public_id, setImages, setLoading)} className='absolute text-red-500 top-0 right-0 text-2xl hidden group-hover:block cursor-pointer'>
                                                            <IoIosCloseCircle />
                                                        </div>

                                                    </div>
                                                )
                                            })}

                                            {/* Plus Icon */}
                                            {Images.length >= 5 ?
                                                <div></div>
                                                :
                                                <div onClick={() => {
                                                    ref.current.click()
                                                }} className='text-7xl text-orange-500 hover:text-orange-800 cursor-pointer self-center'>
                                                    <BsPlusCircle />
                                                </div>
                                            }
                                        </div>

                                    </>
                                }

                                {/* Upload Images */}
                                <div className="addImage">
                                    <input onChange={(e) => {
                                        handleImageUpload(e, setImages, setLoading)
                                    }} ref={ref} multiple className='hidden' type="file" name="input" id="" />
                                </div>

                                {/* Submit BTN */}
                                <div className="btn mt-5 mb-12">
                                    <Button isLoading={loading} onClick={createProduct} float={'right'} size={'lg'} colorScheme='orange'>
                                        Create
                                    </Button>
                                </div>
                            </div>

                        </ModalBody>

                    </ModalContent>
                </div>
            </Modal>
        </div>
    )
}
