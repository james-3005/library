import React from 'react'
import styles from './Background4.module.scss'

function Background1({children}) {
    return (
        <div className={styles.component}>
            {/* <img className={styles.footer} alt="" src="image/svg/footer3.svg"/> */}
            <img className={styles.footer_animal} alt="" src="image/svg/footer4-animal.svg"/>
            {/* <img className={styles.footer_cloud} alt="" src="image/svg/footer2-cloud.svg"/> */}
            <img className={styles.footer_flower} alt="" src="image/svg/footer4-flower.svg"/>
            {children}
        </div>
    )
}
export default Background1
