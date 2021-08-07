import React from "react";
import styles from "./Background1.module.scss";
import s from "classnames";

function Background1({ children }) {
    return (
        <div className={styles.component}>
            <img
                className={styles.footer}
                alt=""
                src="/image/svg/footer1.svg"
            />
            <img
                className={styles.footer_animal}
                alt=""
                src="/image/svg/footer1-animal.svg"
            />
            {children}
        </div>
    );
}
export default Background1;
