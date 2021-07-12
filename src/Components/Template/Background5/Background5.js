import React from 'react'
import styles from './Background5.module.scss'

function Background1({children}) {
    return (
        <div className={styles.component}>
            {/* <img className={styles.footer} alt="" src="image/svg/footer3.svg"/> */}
            <img className={styles.footer_animal} alt="" src="image/svg/footer5-animal.svg"/>
            {/* <img className={styles.footer_cloud} alt="" src="image/svg/footer2-cloud.svg"/> */}
            <img className={styles.footer_moon} alt="" src="image/svg/footer5-moon.svg"/>
            {children}
        </div>
    )
}
export default Background1
