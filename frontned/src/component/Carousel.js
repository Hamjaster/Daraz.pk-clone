import React, { useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "swiper/css/autoplay";
import bg1 from '../images/bg2.jpg'
import bg2 from '../images/bg3.jpg'
import bg3 from '../images/bg4.jpg'
import bg4 from '../images/bg5.jpg'
import bg5 from '../images/bg6.jpg'
import bg6 from '../images/bg7.png'
import bg7 from '../images/bg8.jpg'

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'

export default function CarouselComponent() {

    return (
        <div className='rounded-full h-full px-4 py-2'>
            <Swiper className='rounded-2xl'
                spaceBetween={0} slidesPerView={1}
                modules={[Navigation, Autoplay, Pagination]}
                loop={true}
                autoplay={{
                    delay: 1800,
                    disableOnInteraction: false,
                }}
                navigation={{
                    nextEl: '.swiper-button-nexti',
                    prevEl: '.swiper-button-previ',
                }}


            >
                <SwiperSlide>
                    <img src={bg1} alt="" srcset="" />
                </SwiperSlide>
                <SwiperSlide  >
                    <img src={bg2} alt="" srcset="" />
                </SwiperSlide>
                <SwiperSlide >
                    <img src={bg3} alt="" srcset="" />
                </SwiperSlide>
                <SwiperSlide >
                    <img src={bg4} alt="" srcset="" />
                </SwiperSlide>
                <SwiperSlide >
                    <img src={bg5} alt="" srcset="" />
                </SwiperSlide>
                <SwiperSlide >
                    <img src={bg6} alt="" srcset="" />
                </SwiperSlide>
                <SwiperSlide >
                    <img src={bg7} alt="" srcset="" />
                </SwiperSlide>


                <div className='absolute z-50 flex justify-between items-center top-0 bottom-0 left-0 right-0'>
                    <button className="swiper-button-previ text-white bg-white bg-opacity-80 h-min  text-xl sm:text-3xl md:text-5xl">
                        <GrFormPrevious />
                    </button>
                    <button className="swiper-button-nexti text-white bg-white bg-opacity-80 h-min  text-xl sm:text-3xl md:text-5xl">
                        <GrFormNext />
                    </button>
                </div>

            </Swiper>

        </div>

    )
}
