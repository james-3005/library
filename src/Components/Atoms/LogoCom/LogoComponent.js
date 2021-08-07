import React from "react";
import styles from "./logoComponent.module.scss";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function LogoComponent() {
    const history = useHistory();
    const { t } = useTranslation();
    return (
        <div className={styles.logo} onClick={() => history.push("/")}>
            <div>
                <img src="/Image/svg/logo.svg" alt="logo" />
            </div>
            <div className={styles.logoTitle}>
                <h3>{t("library")}</h3>
                <div className={styles.line}></div>
                <p>{t("libraryName")}</p>
            </div>
        </div>
    );
}

export default LogoComponent;
