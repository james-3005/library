import React from "react";
// import Swiper core and required modules
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselSlide from "../../MoreClues/CarouselSlide/CarouselSlide";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "../../MoreClues/CarouselSlide/Carousel.scss";
import Background3 from "../../Template/Background3/Background3";
// install Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y]);

export default () => {
  const array = [
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 1,
      author: "author",
      type: "type",
      button: "",
      id: 1,
    },
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 2,
      author: "author",
      type: "type",
      button: "",
      id: 2,
    },
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 3,
      author: "author",
      type: "type",
      button: "",
      id: 3,
    },
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 4,
      author: "author",
      type: "type",
      button: "",
      id: 4,
    },
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 5,
      author: "author",
      type: "type",
      button: "",
      id: 5,
    },
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 6,
      author: "author",
      type: "type",
      button: "",
      id: 6,
    },
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 7,
      author: "author",
      type: "type",
      button: "",
      id: 7,
    },
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 8,
      author: "author",
      type: "type",
      button: "",
      id: 8,
    },
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 9,
      author: "author",
      type: "type",
      button: "",
      id: 9,
    },
    {
      image:
        "https://taisachmoi.com/wp-content/uploads/2018/12/dac-nhan-tam.jpg",
      price: 10,
      author: "author",
      type: "type",
      button: "",
      id: 10,
    },
  ];

  return (
    <Background3>
      <div className="Carousel">
        <h2 className="Header">Sách mới xuất bản</h2>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          slidesPerGroup={5}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          // pagination={{ clickable: true }}
          // scrollbar={{ draggable: false }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className="mySwiper"
        >
          {array.map((data) => {
            return (
              <SwiperSlide>
                <CarouselSlide data={data} />
              </SwiperSlide>
            );
          })}
          {/* <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
          <SwiperSlide>Slide 10</SwiperSlide>
          <SwiperSlide>Slide 11</SwiperSlide>
          <SwiperSlide>Slide 12</SwiperSlide>
          <SwiperSlide>Slide 13</SwiperSlide>
          <SwiperSlide>Slide 14</SwiperSlide>
          <SwiperSlide>Slide 15</SwiperSlide> */}
        </Swiper>
      </div>
    </Background3>
  );
};
