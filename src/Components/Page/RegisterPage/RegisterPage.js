import React from "react";
import Background5 from "../../Template/Background5/Background5";
import RegisterComponent from "../../MoreClues/RegisterComponent/RegisterComponent";
import styles from "../LoginPage/LoginPage.module.scss";

function RegisterPage() {
    return (
        <Background5>
            <div className={styles.loginComponent}>
                <RegisterComponent />
            </div>
        </Background5>
    );
}

export default RegisterPage;
