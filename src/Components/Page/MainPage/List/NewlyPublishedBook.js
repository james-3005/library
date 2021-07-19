import React from "react";
// import Swiper core and required modules

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import styles from "./Carousel.module.scss";
import Background3 from "../../../Template/Background3/Background3";
import Carousel2 from "../../../MoreClues/Carousel/Carousel2";
// install Swiper modules

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
      <div className={styles.Carousel}>
        <h2 className={styles.Header}>Sách mới xuất bản</h2>
        <Carousel2 data={array}/>
      </div>
    </Background3>
  );
};
