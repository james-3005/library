import React, { useState, useRef, useEffect } from "react";
import OrangeButton from "../../Atoms/OrangeButton/OrangeButton";
import styles from "./LoginComponent.module.scss";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../Context/AuthProvider";
import { useLoader } from "../../../Context/LoaderProvider";
import { auth } from "../../../firebase";
import { useTranslation } from "react-i18next";
function LoginScreen() {
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
        signup(email, password)
            .then(() => {
                turnOffLoader();
                console.log("signUp");
                setSignUpScreen(false);
            })
            .catch((err) => {
                setSpanEmail(t("emailInUse"));
                turnOffLoader();
            });
    };
    const axios = require('axios')
    const handleLogin = async () => {
        turnOnLoader();
        axios.post("https://library-mini.xyz/api/v1/auth/login", {
            email: "19020325@vnu.edu.vn",
            password: "123456789"
        })
            .then(async (result) => {
                setCurrentUser(auth.currentUser);
                window.localStorage.setItem("user", auth.currentUser);
                turnOffLoader();
                console.log(result)
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
                if (password.length < 6) {
                    setSpanPassword(t("PassNotValid"));
                    break;
                }
                let x = false;
                for (let i = 0; i < password.length; i++)
                    if (password[i] <= "Z" && password[i] >= "A") {
                        x = true;
                        break;
                    }
                if (!x) setSpanPassword(t("PassNotValid"));
                break;
            case "confirmpassword":
                if (password !== confirmPassword)
                    setSpanConfirmPassword(t("PassNotSame"));
                break;
            case "username":
                if (username === "") setSpanUsername(t("UsernameNotValid"));
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
                        <p className={styles.descript}>
                            <span>
                                {signUpScreen ? t("HaveAcc") : t("NotHaveAcc")}
                            </span>
                            <span
                                className={styles.signUp}
                                onClick={() => handleSwitch()}
                            >
                                {signUpScreen ? t("login") : t("signUp")}
                            </span>{" "}
                            {t("now")}.
                        </p>
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
                        <p className={styles.descript}>
                            <span>{t("HaveAcc")}</span>
                            <span
                                className={styles.signUp}
                                onClick={setForgotPasswordScreen}
                            >
                                {t("login")}
                            </span>{" "}
                            {t("now")}.
                        </p>
                    </div>
                </motion.div>
            )}
        </>
    );
}

export default LoginScreen;
