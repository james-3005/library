import React, { useState } from "react";
import CartComponent from "../../Atoms/CartCom/CartCom";
import LogoComponent from "../../Atoms/LogoCom/LogoComponent";
import NavComponent from "../../Atoms/navComponent/navComponent";
import styles from "./NavBar.module.scss";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../Translate/i18n";
import { useAuth } from "../../../Context/AuthProvider";
function NavBar({ isAdmin, setIsAdmin }) {
    const history = useHistory();
    const { t } = useTranslation();
    const { currentUser, setCurrentUser } = useAuth();
    const handleLogout = () => {
        setCurrentUser("");
        window.localStorage.setItem("user", "");
        history.push("/");
        setIsAdmin(false);
    };
    return (
        <div className={styles.header}>
            <LogoComponent />
            <NavComponent isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
            <div className={styles.changeLanguage}>
                <p onClick={() => i18n.changeLanguage("vi")}>VI</p>
                <p onClick={() => i18n.changeLanguage("en")}>EN</p>
            </div>
            {!currentUser ? (
                <div
                    className={styles.login}
                    onClick={() => history.push("/loginPage")}
                >
                    <p>
                        <img src="/Image/svg/login.svg" />
                        {t("login")}
                    </p>
                </div>
            ) : (
                <div className={styles.login} onClick={handleLogout}>
                    <p>
                        <img src="/Image/svg/login.svg" />
                        {t("logout")}
                    </p>
                </div>
            )}
        </div>
    );
}

export default NavBar;
