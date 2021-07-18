import React, {useRef} from 'react'
import styles from './Carousel.module.scss'
function Carousel() {
    const carouselRef = useRef();
    const handleScroll = (key) => {
        // if(key === "next")
            carouselRef.current.scrollTo({
                left: carouselRef.current.scrollLeft+ key,
                behavior: 'smooth',
            });
    }
    return (
        <div className={styles.component}>
            <img src="/image/svg/nextCarousel.svg" alt="" 
            className={styles.next} onClick={() => handleScroll(300)}/>
            <img src="/image/svg/backCarousel.svg" alt="" 
            className={styles.back} onClick={() => handleScroll(-300)}/>
         
            <div className={styles.carousel} ref={carouselRef}>
            <div>
                <div className={styles.test}/>  
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
                <div className={styles.test}/>
            </div>

                
            </div>
        </div>
    )
}

export default Carousel
