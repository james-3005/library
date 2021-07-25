import React from 'react'
import styles from './logoComponent.module.scss'
import { Link, useHistory } from 'react-router-dom'

function LogoComponent() {
    const history= useHistory();
    return (
        <div className={styles.logo} onClick={() =>history.push('/')}>
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

export default LogoComponent