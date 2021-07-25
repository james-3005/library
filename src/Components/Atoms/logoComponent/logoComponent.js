import React from 'react'
import styles from './logoComponent.module.scss'
function logoComponent() {
    return (
        <div className={styles.logo}>
            <div>
                <img src="image/svg/logo.svg" alt="logo" />
            </div>
            <div className={styles.logoTitle}>
                <h3>Nhà sách</h3>
                <div className={styles.line}></div>
                <p>Sở thú ma thuật</p>
            </div>
        </div>

    )
}

export default logoComponent