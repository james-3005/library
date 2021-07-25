import React from 'react'
import CartComponent from '../../Atoms/cartComponent/cartComponent'
import LogoComponent from '../../Atoms/logoComponent/logoComponent'
import NavComponent from '../../Atoms/navComponent/navComponent'
import styles from './NavBar.module.scss'
function NavBar() {
    return (
        <div className={styles.header}>
            <LogoComponent/>
            <NavComponent/>
            <div className={styles.search}>
                <a href="" alt="search"><img src="image/svg/search.svg" />Search</a> 
            </div>
            <div className={styles.login}>
                <a href=""><img src="image/svg/login.svg" />Login</a> 
            </div>
            <CartComponent />

         {/* <div className={styles.cc}>
            MainPage
        <Link to="/">main</Link>
        <Link to="/adminPage">adminPage</Link>
        <Link to="/loginPage">loginPage</Link>
        <Link to="/paymentPage">paymentPage</Link>
        <Link to="/reviewPage">reviewPage</Link>
        </div> */}
    </div> 
    )
}

export default NavBar
