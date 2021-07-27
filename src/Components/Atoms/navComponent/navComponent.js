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
                        <li><Link to="/adminPage">Admin</Link></li>
                        <li><Link to="/loginPage">Login</Link></li>
                        <li><Link to="/paymentPage">Payment</Link></li>
                        <li><Link to="/reviewPage">Review</Link></li>
                        <li><Link to="/userPage">User</Link></li>
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