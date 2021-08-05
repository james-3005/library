import React from "react";
import Background5 from "../../Template/Background5/Background5";
import LoginComponent from "../../MoreClues/LoginComponent/LoginComponent";
import styles from "./LoginPage.module.scss";

function LoginPage({ setIsAdmin }) {
    return (
        <Background5>
            <div className={styles.loginComponent}>
                <LoginComponent setIsAdmin={setIsAdmin} />
            </div>
        </Background5>
    );
}

export default LoginPage;
