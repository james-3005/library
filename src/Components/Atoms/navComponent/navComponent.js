import React from 'react'
import styles from './navComponent.module.scss'
import {Link} from 'react-router-dom'
function navComponent() {
    return (
        <div>
            <ul className={styles.nav}>
                <li className={styles.dropDown}>
                    <p style={{cursor: 'pointer'}}>Menu</p>
                    <ul className={styles.dropDown_content}>
                        <li><Link to="/adminPage/book" className={styles.link}>Manage Book</Link></li>
                        <li><Link to="/loginPage" className={styles.link}>Login</Link></li>
                        <li><Link to="/paymentPage" className={styles.link}>Payment</Link></li>
                        <li><Link to="/reviewPage" className={styles.link}>Review</Link></li>
                        <li><Link to="/userPage" className={styles.link}>User</Link></li>
                        <li><Link to="/adminPage/user" className={styles.link}>Manage User</Link></li>
                    </ul>
                </li>
                <li>Contact</li>
                <li>About</li>
                <li>Help</li>
            </ul>
        </div>
    )
}

export default navComponent