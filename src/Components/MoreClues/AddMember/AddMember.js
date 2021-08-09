import React, { useState, useEffect } from "react";
import OrangeButton from "../../Atoms/OrangeButton/OrangeButton";
import styles from "../LoginComponent/LoginComponent.module.scss";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../Context/AuthProvider";
import { useLoader } from "../../../Context/LoaderProvider";
import { useTranslation } from "react-i18next";
import { useNoti } from "../../../Context/NotificationProvider";
import { api } from "../../../env";
import axios from "axios";
function AddMember() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [spanEmail, setSpanEmail] = useState("");
    const [spanUsername, setSpanUsername] = useState("");
    const { addNoti } = useNoti();
    const { signup } = useAuth();
    const { turnOnLoader, turnOffLoader } = useLoader();
    const { t } = useTranslation();

    const handleSignUp = () => {
        checkvalid("email");
        checkvalid("username");
        if (spanEmail !== "" || spanUsername !== "") return;
        turnOnLoader();
        signup(email, username, "1234567890", phone)
            .then((res) => {
                turnOffLoader();
                addNoti(t("notiRegisterSuccess"), "success");
            })
            .catch((err) => {
                setSpanEmail(t("emailInUse"));
                addNoti(t("notiRegisterFail"), "fail");
                turnOffLoader();
            });
    };

    const checkvalid = (type) => {
        switch (type) {
            case "email":
                const re =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!re.test(String(email).toLowerCase()))
                    setSpanEmail(t("EmailNotValid"));
                else setSpanEmail("");
                break;
            case "username":
                if (username.length < 2) setSpanUsername(t("UsernameNotValid"));
                else setSpanUsername("");
                break;
        }
    };
    const history = useHistory();

    useEffect(() => {
        axios
            .get(`${api}auth/user-profile`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "user"
                    )}`,
                },
            })
            .then((res) => {})
            .catch((err) => {
                addNoti(t("timeout"), "fail");
                history.push("/");
            });
    }, []);
    return (
        <>
            <motion.div
                initial={{ opacity: 0.4, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.mainComponent}
            >
                <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className={
                        spanEmail !== "" ? styles.input_warn : styles.input
                    }
                    onBlur={() => checkvalid("email")}
                    onFocus={() => setSpanEmail("")}
                />
                <span className={styles.span}>{spanEmail}</span>
                <div className={styles.visible}>
                    <input
                        type="text"
                        placeholder={t("name")}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        className={
                            spanUsername !== ""
                                ? styles.input_warn
                                : styles.input
                        }
                        onBlur={() => checkvalid("username")}
                        onFocus={() => setSpanUsername("")}
                    />
                </div>
                <span className={styles.span} style={{ marginTop: -20 }}>
                    {spanUsername}
                </span>
                <input
                    type="text"
                    placeholder={t("phone")}
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    className={styles.input}
                />

                <div className={styles.footer}>
                    <OrangeButton
                        size="medium"
                        text={t("addMember")}
                        action={handleSignUp}
                    />
                </div>
            </motion.div>
        </>
    );
}

export default AddMember;
