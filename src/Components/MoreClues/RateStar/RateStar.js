import React, { useEffect, useState } from "react";
import styles from "./RateStar.module.scss";
import c from "classnames";
import { useTranslation } from "react-i18next";

function RateStar({ openAddComment, star = 3, number = 0 }) {
    const [listStar, setListStar] = useState(0);
    const { t } = useTranslation();
    useEffect(() => {
        let exp = [];
        for (let i = 0; i < 5; i++) {
            if (i < star)
                exp.push(
                    <img key={i} src="/Image/svg/yellowStar.svg" alt="" />
                );
            else exp.push(<img key={i} src="/Image/svg/grayStar.svg" alt="" />);
        }
        setListStar(exp);
    }, []);
    return (
        <div className={styles.component}>
            <p className={styles.header}>{t("vote")}</p>
            <div className={styles.boxAvg}>
                <p className={styles.Avg}>{star.toFixed(1)}</p>
                <div className={styles.listStar}>{listStar}</div>
                <p className={styles.number}>{`${t("baseOn1")} ${number} ${t(
                    "baseOn2"
                )}`}</p>
            </div>
            <div className={styles.listVote}>
                <div className={styles.line}>
                    <p className={styles.kind}>{t("5")}</p>
                    <div className={styles.color}>
                        <div className={styles.voteColor5} />
                    </div>
                </div>
                <div className={styles.line}>
                    <p className={styles.kind}>{t("4")}</p>
                    <div className={styles.color}>
                        <div className={styles.voteColor4} />
                    </div>
                </div>
                <div className={styles.line}>
                    <p className={styles.kind}>{t("3")}</p>
                    <div className={styles.color}>
                        <div className={styles.voteColor3} />
                    </div>
                </div>
                <div className={styles.line}>
                    <p className={styles.kind}>{t("2")}</p>
                    <div className={styles.color}>
                        <div className={styles.voteColor2} />
                    </div>
                </div>
                <div className={styles.line}>
                    <p className={styles.kind}>{t("1")}</p>
                    <div className={styles.color}>
                        <div className={styles.voteColor1} />
                    </div>
                </div>
            </div>
            <button className={styles.addComment} onClick={openAddComment}>
                {t("AddComment")}
            </button>
        </div>
    );
}

export default RateStar;
