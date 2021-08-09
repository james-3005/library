import React from "react";
import styles from "./Background6.module.scss";

function Background1({ children }) {
    return (
        <div className={styles.component}>
            <img
                className={styles.footer_animal}
                alt=""
                src="/Image/svg/footer6.svg"
            />
            <img
                className={styles.cloud}
                alt=""
                src="/Image/svg/footer2-cloud.svg"
            />
            {children}
        </div>
    );
}
export default Background1;
