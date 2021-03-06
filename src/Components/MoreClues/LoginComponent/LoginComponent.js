import React, { useState, useRef, useEffect } from "react";
import OrangeButton from "../../Atoms/OrangeButton/OrangeButton";
import styles from "./LoginComponent.module.scss";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../Context/AuthProvider";
import { useLoader } from "../../../Context/LoaderProvider";
import { useTranslation } from "react-i18next";
import { useNoti } from "../../../Context/NotificationProvider";
function LoginScreen({ setIsAdmin }) {
    const [signUpScreen, setSignUpScreen] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [spanEmail, setSpanEmail] = useState("");
    const [spanUsername, setSpanUsername] = useState("");
    const [spanPassword, setSpanPassword] = useState("");
    const [spanConfirmPassword, setSpanConfirmPassword] = useState("");
    const { addNoti } = useNoti();
    const {
        signup,
        login,
        currentUser,
        logout,
        setCurrentUser,
        resetPassword,
        updatePassword,
    } = useAuth();
    const { turnOnLoader, turnOffLoader } = useLoader();
    const { t } = useTranslation();
    const handleSwitch = () => {
        setSpanConfirmPassword("");
        setSpanUsername("");
        setSignUpScreen(!signUpScreen);
    };
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
    const axios = require("axios");
    const handleLogin = async () => {
        checkvalid("email");
        checkvalid("password");
        if (spanEmail !== "" || spanPassword !== "") return;
        turnOnLoader();
        login(email, password)
            .then((res) => {
                addNoti(t("notiLoginSuccess"), "success");
                setCurrentUser(res["access_token"]);
                window.localStorage.setItem("user", res["access_token"]);
                history.push("/");
                turnOffLoader();
                setIsAdmin(true);
            })
            .catch((err) => {
                turnOffLoader();
                if (err.code === "auth/user-not-found") {
                    setSpanEmail(t("EmailNotFound"));
                    setSpanPassword("");
                    return;
                }
                setSpanPassword(t("wrongPass"));
                setSpanEmail("");
                console.log(err);
                // console.log(errc)
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
    const setForgotPasswordScreen = () => {
        if (!forgotPassword) setSpanEmail(t("EnterEmail"));
        else setSpanEmail("");
        setForgotPassword(!forgotPassword);
    };
    const handleForgotPassword = () => {
        checkvalid("email");
        if (spanEmail !== "") return;
        alert(t("CheckEmail"));
        resetPassword(email);
    };

    return (
        <>
            {!forgotPassword ? (
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
                    <div
                        className={
                            signUpScreen ? styles.visible : styles.notvisible
                        }
                    >
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
                            spanPassword !== ""
                                ? styles.input_warn
                                : styles.input
                        }
                        onBlur={() => checkvalid("password")}
                        onFocus={() => setSpanPassword("")}
                    />
                    <span className={styles.span}>{spanPassword}</span>
                    <div
                        className={
                            signUpScreen ? styles.visible : styles.notvisible
                        }
                    >
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
                        {forgotPassword || !signUpScreen ? (
                            <p
                                className={styles.forgotpassword}
                                onClick={setForgotPasswordScreen}
                            >
                                {t("ForgotPass")}?
                            </p>
                        ) : (
                            <div />
                        )}
                        <OrangeButton
                            size="medium"
                            text={signUpScreen ? t("signUp") : t("login")}
                            action={signUpScreen ? handleSignUp : handleLogin}
                        />
                    </div>
                </motion.div>
            ) : (
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
                    <div className={styles.footer}>
                        <p
                            className={styles.forgotpassword}
                            onClick={setForgotPasswordScreen}
                        >
                            {t("turnBack")}
                        </p>
                        :
                        <OrangeButton
                            size="medium"
                            text={t("sendEmail")}
                            action={handleForgotPassword}
                        />
                    </div>
                </motion.div>
            )}
        </>
    );
}

export default LoginScreen;
