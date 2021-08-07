import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./SearchBar.module.scss";

function SeachBar({
    activeSearch,
    setActiveSearch,
    activeFilter,
    setActiveFilter,
    setArray,
}) {
    const searchRef = useRef();
    const [value, setValue] = React.useState("");
    const handleToggle = () => {
        if (!activeSearch) {
            setActiveSearch(!activeSearch);
            setActiveFilter(false);
            setValue("");
        } else {
            setActiveSearch(!activeSearch);
        }
    };
    const [press, setpress] = useState(0);
    const { t } = useTranslation();
    useEffect(() => {
        let event = searchRef.current.addEventListener(
            "keyup",
            (e) => {
                if (e.keyCode === 13 && !e.repeat) setpress(press + 1);
            },
            { once: true }
        );
        return event;
    }, []);
    useEffect(() => {
        console.log("1");
    }, [press]);
    return (
        <div className={styles.searchComponent} ref={searchRef}>
            <button className={styles.btn} onClick={handleToggle}>
                <img src="/Image/svg/search.svg" alt="" />
            </button>

            <input
                type="text"
                placeholder={t("EnterName")}
                className={!activeSearch ? styles.input_active : styles.input}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}

export default SeachBar;
