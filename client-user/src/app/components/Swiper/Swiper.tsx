// @ts-ignore
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
// import { QRCodeScanner } from "@app/components";
import { useState } from "react";
import {FindProduct} from "@app/components";

SwiperCore.use([Navigation]);

const ImageSlider = () => {
    const [showQR, setShowQR] = useState<boolean>(false);

    return (
        <section className="relative h-screen">
            <Swiper
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                className="h-screen"
            >
                <SwiperSlide className="bg-cover bg-center relative flex items-center justify-center">
                    <div className='h-1/5 border-r-4 absolute top-0 border-black'></div>
                    <div className='w-1/12 border-b-4 absolute right-0 border-black'></div>
                    <div className="text-2xl">
                        {showQR ?
                            <p>Qr code scanner...</p>
                            // <QRCodeScanner />
                            :
                            <div onClick={() => setShowQR(true)}>Click here</div>
                        }

                    </div>
                    <div className='h-1/5 border-r-4 absolute bottom-0 border-black'></div>
                </SwiperSlide>
                <SwiperSlide className="bg-cover bg-center relative flex items-center justify-center">
                    <FindProduct />
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default ImageSlider;
