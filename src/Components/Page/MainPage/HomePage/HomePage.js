import React from 'react'
import Background1 from '../../../Template/Background1/Background1'
import styles from './HomePage.module.scss'
import OrangeButton from '../../../Atoms/OrangeButton/OrangeButton'

function Homepage() {
    return (
        <Background1>
            <p className={styles.name}>The Magic Library</p>
            <div className={styles.button}>
                <OrangeButton size={"medium"} text={"Lướt xem ngay"}/>
            </div>
            <p className={styles.title}>Kho tàng sách bổ ích</p>
            <p className={styles.title2}>Đây là bài tập lớn môn phát triển ứng dụng web</p>
        </Background1>
    )
}

export default Homepage