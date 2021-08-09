import React, { useEffect, useState } from "react";
import styles from "./navComponent.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { api } from "../../../env";
import { useTranslation } from "react-i18next";
function NavComponent({ isAdmin, setIsAdmin }) {
    const { t } = useTranslation();
    useEffect(() => {
        axios
            .get(`${api}auth/user-profile`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "user"
                    )}`,
                },
            })
            .then((res) => {
                setIsAdmin(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div>
            <ul className={styles.nav}>
                <li className={styles.dropDown}>
                    <p style={{ cursor: "pointer" }}>{t("menu")}</p>
                    <ul className={styles.dropDown_content}>
                        {isAdmin ? (
                            <>
                                <li>
                                    <Link
                                        to="/registerPage"
                                        className={styles.link}
                                    >
                                        Register Admin
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/userPage"
                                        className={styles.link}
                                    >
                                        User information
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/adminPage/book"
                                        className={styles.link}
                                    >
                                        Manage Book
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/adminPage/user"
                                        className={styles.link}
                                    >
                                        Manage User
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/historyPage"
                                        className={styles.link}
                                    >
                                        Manage History
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <div />
                        )}
                    </ul>
                </li>
                <li>{t("contact")}</li>
                <li>{t("help")}</li>
            </ul>
        </div>
    );
}

export default NavComponent;
