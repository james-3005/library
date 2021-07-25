import React from 'react'
import styles from './navComponent.module.scss'

function navComponent() {
    return (
        <div>
            <ul className={styles.nav}>
                <li className={styles.dropDown}>
                    <a href="">Menu</a>
                    <ul className={styles.dropDown_content}>
                        <li><a href="">Home</a></li>
                        <li><a href="">Login</a></li>
                        <li><a href="">Logout</a></li>
                        <li><a href="">History</a></li>
                    </ul>
                </li>
                <li><a href="">Contact</a></li>
                <li><a href="">About</a></li>
                <li><a href="">Help</a></li>
            </ul>
        </div>
    )
}

export default navComponent