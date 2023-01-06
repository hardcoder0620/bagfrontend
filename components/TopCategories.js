import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import Link from 'next/link';
import { Navigation } from "swiper";
import { FaAngleLeft,FaAngleRight } from 'react-icons/fa';




export default function TopCategories() {

    return (
        <>
            <div className="shopTopCatDiv">
                <div className="container">
                    <div className="head">Shop Top Categories</div>
                    <div className="catCarousel">
                        <Swiper
                            breakpoints={{
                                700: {
                                    slidesPerView: 4
                                }
                            }}
                            navigation={{
                                nextEl: '.next',
                                prevEl: '.prev',
                            }}

                            modules={[Navigation]}

                            spaceBetween={30}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            className="topSlider"
                        >
                            <SwiperSlide>
                                <div className="catBox">
                                    <Link href={'/products?cat=men'} style={{ textDecoration: 'none' }}>
                                        <img src="/images/menformal2.webp" alt="banner image" className="w-100 bannerImg" />
                                        <div className="catName">
                                            Men
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="catBox">
                                <Link href={'/products?cat=women'} style={{ textDecoration: 'none' }}>
                                    <img src="/images/womenlehenga2.webp" alt="banner image" className="w-100 bannerImg" />
                                    <div className="catName">
                                        Women
                                    </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="catBox">
                                <Link href={'/products?cat=kids'} style={{ textDecoration: 'none' }}>
                                    <img src="/images/kidstshirt2.webp" alt="banner image" className="w-100 bannerImg" />
                                    <div className="catName">
                                       Kids
                                    </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="catBox">
                                <Link href={'/products?cat=women'} style={{ textDecoration: 'none' }}>
                                    <img src="/images/womenlehenga2.webp" alt="banner image" className="w-100 bannerImg" />
                                    <div className="catName">
                                        Women
                                    </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="catBox">
                                    <Link href={'/products?cat=men'} style={{ textDecoration: 'none' }}>
                                        <img src="/images/menformal2.webp" alt="banner image" className="w-100 bannerImg" />
                                        <div className="catName">
                                            Men
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                           

                        </Swiper>
                        <div className="navBtns">
                            <div className="navBtn prev">
                            <FaAngleLeft className='iconn'/>
                            </div>
                            <div className="navBtn next">
                            <FaAngleRight className='iconn' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
