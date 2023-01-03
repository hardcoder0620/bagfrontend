import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import 'swiper/css/effect-cube';
import { EffectCube } from 'swiper';

export default function TopCarousel() {
    return (
        <>
            <Swiper
                pagination={{
                  dynamicBullets: true,
                }}
                modules={[Pagination,EffectCube]}
                effect="cube"
                spaceBetween={0}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                slidesPerView={1}
                className="topSlider"
            >
                <SwiperSlide>
                    <div className="imgBox">
                        <img src="/images/banner1.png" alt="banner image" className="w-100 bannerImg" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="imgBox">
                        <img src="/images/banner1.png" alt="banner image" className="w-100 bannerImg" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="imgBox">
                        <img src="/images/banner1.png" alt="banner image" className="w-100 bannerImg" />
                    </div>
                </SwiperSlide>
            </Swiper>

        </>
    )
}
