import React, { useContext, useEffect, Suspense } from 'react'
import '../App.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Products from '../component/Product/Products';
import Footer from '../component/Footer';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import bg7 from '../images/bg8.jpg'
import { Context } from '../context/contextApi';

const CarouselComponent = React.lazy(() => import('../component/Carousel'))

export default function Home() {
    const { keyword } = useContext(Context)

    return (
        <div >
            {/* If no search, no carousel */}
            {keyword ? <></> :
                <div>
                    <Suspense fallback={<div className='px-4 py-2'>
                        <Skeleton>
                            <img src={bg7} alt="" srcset="" />
                        </Skeleton>
                    </div>
                    }>
                        <CarouselComponent />
                    </Suspense>
                </div>
            }
            <div className="mb-56">
                <Products />
            </div>
            <Footer />
        </div>
    )
}
