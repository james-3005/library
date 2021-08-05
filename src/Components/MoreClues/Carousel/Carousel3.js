import React, { useRef } from "react";
import styles from "./Carousel3.module.scss";
import CarouselSilde from "../CardItem/CardItem";
function Carousel({ data }) {
    const carouselRef = useRef();
    const handleScroll = (key) => {
        // if(key === "next")
        carouselRef.current.scrollTo({
            left: carouselRef.current.scrollLeft + key,
            behavior: "smooth",
        });
    };
    return (
        <div className={styles.component}>
            <img
                src="/image/svg/nextCarousel.svg"
                alt=""
                className={styles.next}
                onClick={() => handleScroll(300)}
            />
            <img
                src="/image/svg/backCarousel.svg"
                alt=""
                className={styles.back}
                onClick={() => handleScroll(-300)}
            />
            <div className={styles.carousel} ref={carouselRef}>
                <div style={{ display: "flex" }}>
                    {data ? (
                        data.map((item, index) => (
                            <CarouselSilde key={index} data={item} />
                        ))
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Carousel;
