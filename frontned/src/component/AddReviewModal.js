import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Textarea,
    useDisclosure,
    useConst,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import ReactStars from 'react-stars'
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import { Context } from '../context/contextApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from './utils/Toast';


export function AddReviewModal({ isOpen, onClose, onOpen, hasUserReview }) {
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)
    const { Product, count, setCount } = useContext(Context)

    const ratingChanged = (r) => {
        console.log('raintg', r)
        setRating(r)
    }

    const sendReview = async () => {

        console.log(JSON.parse(localStorage.getItem('userInfo')).token)
        try {
            const { data } = await axios.post('http://localhost:5000/review/add', {
                productId: Product._id,
                comment,
                rating
            }, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token} `
                }
            })
            console.log(data)
            setCount(c => c + 1)

            showToast('success', 'Review Updated !')
        } catch (error) {
            console.log(error)
            showToast('error', error)
        }
    }

    return (
        <>


            <Modal isOpen={isOpen} onClose={() => {
                onClose()
                setComment('')
                setRating(0)
            }} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Review</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="two">
                            <span className='text-xl font-semibold mb-4'>Enter Your Comments on Product :  </span>
                            <Textarea marginTop={4} _focus={{ borderColor: 'orange.200' }} onChange={(e) => {
                                setComment(e.target.value)
                            }} value={comment} placeholder='How was the product?' />

                        </div>
                        <div className="rating mt-5">
                            <StarRatings
                                rating={rating}
                                starRatedColor="#dd6b20"
                                changeRating={ratingChanged}
                                numberOfStars={5}
                                starHoverColor='#dd6b20'
                                name='rating'
                                starDimension="40px"
                                starSpacing='4px'
                            />
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => {
                            sendReview()
                            onClose()
                            setCount(c => c + 1)
                        }} colorScheme='orange' mr={3} >
                            Submit
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}