import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Banner from '../../Banner/Banner';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './SliderStyles.css'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
export default function Slider() {
  const [ids, setIds] = useState([]);
  const apiKey = process.env.REACT_APP_API_URL;
  useEffect(() => {
    // Fetch season data from the API using axios
    axios.get(`${apiKey}ids`)
      .then(response => setIds(response.data))
      .catch(error => console.error("Error fetching ids:", error));
  }, []);
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        slidesPerView={1}
        loop={true}
      >
        <SwiperSlide><Banner type="mid" id={916224} /></SwiperSlide>
        {ids.map((banner, index) => (
        <SwiperSlide key={index}>
          {banner.mid ? (
            <Banner type="mid" id={banner.mid} />
          ) : (
            <Banner type="seid" id={banner.seid} />
          )}
        </SwiperSlide>
      ))}
      </Swiper>
    </>
  );
}