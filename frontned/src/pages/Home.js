import React, { useContext, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import '../App.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Navbar from '../component/Navbar';
import CarouselComponent from '../component/Carousel';
import Products from '../component/Product/Products';
import { useColorMode } from '@chakra-ui/react';
import { Context } from '../context/contextApi';
import Footer from '../component/Footer';

export default function Home() {


    return (
        <div>
            <div>
                <CarouselComponent />
            </div>
            <Products />
            <Footer />
        </div>
    )
}
