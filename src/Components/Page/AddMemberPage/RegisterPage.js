import React from "react";
import AddMember from "../../MoreClues/AddMember/AddMember";
import Background5 from "../../Template/Background5/Background5";

import styles from "../LoginPage/LoginPage.module.scss";

function RegisterPage() {
    return (
        <Background5>
            <div className={styles.loginComponent}>
                <AddMember />
            </div>
        </Background5>
    );
}

export default RegisterPage;
