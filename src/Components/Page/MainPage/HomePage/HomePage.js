import React from 'react'
import Background1 from '../../../Template/Background1/Background1'
import styles from './HomePage.module.scss'
import Logo from '../../../Atoms/logoComponent/logoComponent'
import Cart from '../../../Atoms/cartComponent/cartComponent'
import Nav from '../../../Atoms/navComponent/navComponent'

function Homepage() {
    return (
        <Background1>
            <div className={styles.header}>
                <Logo />
                <Nav />
                <div className={styles.search}>
                    <a href="" alt="search"><img src="image/svg/search.svg" />Search</a> 
                </div>
                <div className={styles.login}>
                    <a href=""><img src="image/svg/login.svg" />Login</a> 
                </div>
                <Cart />
            </div>
        </Background1>
    )
}

export default Homepage