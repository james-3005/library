import React, { useState, useEffect } from "react";
import OrangeButton from "../../Atoms/OrangeButton/OrangeButton";
import styles from "../LoginComponent/LoginComponent.module.scss";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../Context/AuthProvider";
import { useLoader } from "../../../Context/LoaderProvider";
import { useTranslation } from "react-i18next";
import { useNoti } from "../../../Context/NotificationProvider";
import axios from "axios";
function RegisterComponent() {
    const [signUpScreen, setSignUpScreen] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [spanEmail, setSpanEmail] = useState("");
    const [spanUsername, setSpanUsername] = useState("");
    const [spanPassword, setSpanPassword] = useState("");
    const [spanConfirmPassword, setSpanConfirmPassword] = useState("");
    const { addNoti } = useNoti();
    const { signup } = useAuth();
    const { turnOnLoader, turnOffLoader } = useLoader();
    const { t } = useTranslation();

    const handleSignUp = () => {
        checkvalid("email");
        checkvalid("password");
        checkvalid("username");
        checkvalid("confirmpassword");
        if (
            spanEmail !== "" ||
            spanPassword !== "" ||
            spanConfirmPassword !== "" ||
            spanUsername !== ""
        )
            return;
        turnOnLoader();
        signup(email, username, password)
            .then((res) => {
                turnOffLoader();
                addNoti(t("notiRegisterSuccess"), "success");
                setSignUpScreen(false);
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
            case "password":
                if (password.length < 8) {
                    setSpanPassword(t("PassNotValid"));
                } else setSpanPassword("");
                break;
            case "confirmpassword":
                if (password !== confirmPassword)
                    setSpanConfirmPassword(t("PassNotSame"));
                else setSpanConfirmPassword("");
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
            .get("https://library-mini.xyz/api/v1/auth/user-profile", {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "user"
                    )}`,
                },
            })
            .then((res) => {})
            .catch((err) => {
                addNoti("Time out", "fail");
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
                    placeholder="email"
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
                        placeholder="username"
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
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className={
                        spanPassword !== "" ? styles.input_warn : styles.input
                    }
                    onBlur={() => checkvalid("password")}
                    onFocus={() => setSpanPassword("")}
                />
                <span className={styles.span}>{spanPassword}</span>
                <div className={styles.visible}>
                    <input
                        type="password"
                        placeholder="confirm password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        className={
                            spanConfirmPassword !== ""
                                ? styles.input_warn
                                : styles.input
                        }
                        onBlur={() => checkvalid("confirmpassword")}
                        onFocus={() => setSpanConfirmPassword("")}
                    />
                </div>
                <span className={styles.span} style={{ marginTop: -20 }}>
                    {spanConfirmPassword}
                </span>

                <div className={styles.footer}>
                    <OrangeButton
                        size="medium"
                        text={t("signUp")}
                        action={handleSignUp}
                    />
                </div>
            </motion.div>
        </>
    );
}

export default RegisterComponent;
