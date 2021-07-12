import React from 'react'
import styles from './Background6.module.scss'

function Background1({children}) {
    return (
        <div className={styles.component}>
            <img className={styles.footer_animal} alt="" src="image/svg/footer6.svg"/>
            {children}
        </div>
    )
}
export default Background1
