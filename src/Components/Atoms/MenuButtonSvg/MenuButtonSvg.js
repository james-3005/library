import React from 'react'
import styles from './MenuButtonSvg.module.scss'

function MenuButtonSvg({source, text}) {
    return (
        <button className={styles.component}>
            <img src={source} alt="" className={styles.img}/>
            <p className={styles.text}>{text}</p>
        </button>
    )
}

export default MenuButtonSvg
