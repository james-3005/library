import React from "react";
import styles from "./LoaderScreen.module.scss";

function LoaderScreen() {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                right: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#0000008c",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                // opacity: 0.4,
                zIndex: 100,
            }}
        >
            {/* <div className={styles["lds-roller"]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> */}
            <img src="/Image/svg/butterfly.svg" className={styles.butterfly} />
        </div>
    );
}

export default LoaderScreen;
