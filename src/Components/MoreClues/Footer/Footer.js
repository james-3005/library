import React from 'react'
import styles from './Footer.module.scss'
import Logo from '../../Atoms/LogoComponent/LogoComponent'

function Footer() {
    return (
        <div  className={styles.component}>
            <div className={styles.wraper}>
                <img className={styles.bg} alt="" src="image/svg/footer7.svg"/>    
            </div>
            <div className={styles.logo}>
            <Logo/>
            </div>
        <div className={styles.social}>
            <h2 className={styles.header}>Theo dõi để cập nhật những thông tin mới nhất</h2>
            <div className={styles.iconSocial}>
                <img src="image/svg/iconFb.svg"/>
                <img src="image/svg/iconTwitter.svg"/>
                <img src="image/svg/iconInsta.svg"/>
                <img src="image/svg/iconVK.svg"/>
                <img src="image/svg/iconYoutube.svg"/>
            </div>
        </div>
        <div className={styles.contact}>
            <p className={styles.phonenumber}>+38 (071) 339-16-26</p>
            <p className={styles.f}>Liên hệ </p>
        </div> 
    </div>
    )
}

export default Footer
