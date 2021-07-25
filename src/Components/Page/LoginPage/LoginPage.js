import React from 'react'
import Background5 from '../../Template/Background5/Background5'
import LoginComponent from '../../MoreClues/LoginComponent/LoginComponent'
import styles from './LoginPage.module.scss'
import LogoComponent from '../../Atoms/logoComponent/logoComponent'
import NavComponent from '../../Atoms/navComponent/navComponent'
import SearchComponent from '../../Atoms/searchComponent/searchComponent'
import CartComponent from '../../Atoms/cartComponent/cartComponent'

function LoginPage() {
    return (
        <Background5>
            <div className={styles.headerComponent}>
                <LogoComponent />
                <NavComponent />
                <SearchComponent />
                <CartComponent />
            </div>
            <div className={styles.loginComponent}>
                <LoginComponent />
            </div>
        </Background5>
    )
}

export default LoginPage
