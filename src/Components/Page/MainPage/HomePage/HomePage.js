import React from 'react'
import Background1 from '../../../Template/Background1/Background1'
import styles from './HomePage.module.scss'
import OrangeButton from '../../../Atoms/OrangeButton/OrangeButton'
import { motion } from 'framer-motion'

function Homepage() {
    return (
        <Background1>
            <motion.p className={styles.name}
                        initial= {{ opacity: 0.4, y: -100}}
                        animate= {{ opacity: 1, y: 0}}>
                        The Magic Library</motion.p>
            <motion.div className={styles.button}
                        initial= {{ opacity: 0.4, y: -100}}
                        animate= {{ opacity: 1, y: 0}}>
                <OrangeButton size={"medium"} text={"Lướt xem ngay"}/>
            </motion.div>
            <motion.p   className={styles.title}
                        initial= {{ opacity: 0.4, y: -100}}
                         animate= {{ opacity: 1, y: 0}}>Kho tàng sách bổ ích</motion.p>
            <motion.p className={styles.title2}
                        initial= {{ opacity: 0.4, y: -100}}
                        animate= {{ opacity: 1, y: 0}}>Đây là bài tập lớn môn phát triển ứng dụng web</motion.p>
        </Background1>
    )
}

export default Homepage