import React from 'react'
import CartComponent from '../../Atoms/CartCom/CartCom'
import LogoComponent from '../../Atoms/LogoCom/LogoComponent'
import NavComponent from '../../Atoms/navComponent/navComponent'
import styles from './NavBar.module.scss'
import { useHistory } from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import i18n from '../../../Translate/i18n'
function NavBar() {
    const history= useHistory();
    const {t}= useTranslation()
    return (
        <div className={styles.header}>
            <LogoComponent/>
            <NavComponent/>
            <div className={styles.changeLanguage}>
                <p onClick={() => i18n.changeLanguage('vi')}>VI</p>
                <p onClick={() => i18n.changeLanguage('en')}>EN</p>
            </div>
            <div className={styles.login} onClick={() => history.push('/loginPage')}>
                <p><img src="image/svg/login.svg" />{t("login")}</p> 
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
