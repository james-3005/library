import React from "react";
import styles from "./Footer.module.scss";
import Logo from "../../Atoms/LogoCom/LogoComponent";
import { useTranslation } from "react-i18next";

function Footer() {
    const { t } = useTranslation();
    return (
        <div className={styles.component}>
            <div className={styles.wraper}>
                <img
                    className={styles.bg}
                    alt=""
                    src="/Image/svg/footer7.svg"
                />
            </div>
            <div className={styles.logo}>
                <Logo />
            </div>
            <div className={styles.social}>
                <h2 className={styles.header}>{t("footer")}</h2>
                <div className={styles.iconSocial}>
                    <img src="/Image/svg/iconFB.svg" />
                    <img src="/Image/svg/iconTwitter.svg" />
                    <img src="/Image/svg/iconInsta.svg" />
                </div>
            </div>
            <div className={styles.contact}>
                <p className={styles.phonenumber}>+38 (071) 339-16-26</p>
                <p className={styles.f}>{t("contact")}</p>
            </div>
        </div>
    );
}

export default Footer;
