import React, {useRef} from 'react'
import styles from './Carousel.module.scss'
import CarouselSilde from '../CardItem/CardItem'
import { motion } from 'framer-motion';
function Carousel({data}) {
    const carouselRef = useRef();
    const handleScroll = (key) => {
        // if(key === "next")
            carouselRef.current.scrollTo({
                left: carouselRef.current.scrollLeft+ key,
                behavior: 'smooth',
            });
    }
    return (
        <motion.div className={styles.component}
            initial= {{ opacity: 0.4, y: -30}}
            animate= {{ opacity: 1, y: 0}}>
            <img src="/image/svg/nextCarousel.svg" alt="" 
            className={styles.next} onClick={() => handleScroll(300)}/>
            <img src="/image/svg/backCarousel.svg" alt="" 
            className={styles.back} onClick={() => handleScroll(-300)}/>
         
            <div className={styles.carousel} ref={carouselRef}>
            <div>
                {
                    data?
                    data.map((item, index) => (<CarouselSilde key={index} data={item}/>)):
                    <div/>
                }
            </div>

                
            </div>
        </motion.div>
    )
}

export default Carousel
