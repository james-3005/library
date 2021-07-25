import React from 'react'
import CartComponent from '../../Atoms/cartComponent/cartComponent'
import LogoComponent from '../../Atoms/LogoComponent/LogoComponent'
import NavComponent from '../../Atoms/navComponent/navComponent'
import styles from './NavBar.module.scss'
import { useHistory } from 'react-router-dom'
function NavBar() {
    const history= useHistory();
    return (
        <div className={styles.header}>
            <LogoComponent/>
            <NavComponent/>
            <div className={styles.search}>
                <p alt="search"><img src="image/svg/search.svg" />Search</p> 
            </div>
            <div className={styles.login} onClick={() => history.push('/loginPage')}>
                <p><img src="image/svg/login.svg" />Login</p> 
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
