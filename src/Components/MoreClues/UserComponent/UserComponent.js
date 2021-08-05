import React, { useEffect, useState } from "react";
import styles from "./UserComponent.module.scss";
import { useAuth } from "../../../Context/AuthProvider";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNoti } from "../../../Context/NotificationProvider";
import { useHistory } from "react-router-dom";
import { useLoader } from "../../../Context/LoaderProvider";
function UserComponent() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [reNewpassword, setReNewPassword] = useState("");
    const [spanNewPassword, setSpanNewPassword] = useState("");
    const [spanReNewPassword, setSpanReNewPassword] = useState("");
    const [user, setUser] = useState({});
    const { updatePassword, currentUser } = useAuth();
    const { addNoti } = useNoti();
    const { t } = useTranslation();
    const history = useHistory();
    const { turnOnLoader, turnOffLoader } = useLoader();
    const checkvalid = (type) => {
        switch (type) {
            case "newpassword":
                if (newpassword.length < 8)
                    setSpanNewPassword(t("PassNotValid"));
                else setSpanNewPassword("");

                break;
            case "confirmpassword":
                if (newpassword !== reNewpassword)
                    setSpanReNewPassword(t("PassNotSame"));
                break;
        }
    };
    const handleChangePassword = () => {
        checkvalid("newpassword");
        checkvalid("confirmpassword");
        if (spanNewPassword != "" || spanReNewPassword != "") return;
        turnOnLoader();
        updatePassword(currentPassword, newpassword, currentUser)
            .then((res) => {
                addNoti("Đổi mật khẩu thành công", "success");
                history.push("/");
            })
            .catch((err) => {
                // console.log(err);
                addNoti("Đổi mật khẩu thất bại", "fail");
            })
            .finally(() => {
                turnOffLoader();
            });
    };
    useEffect(() => {
        axios
            .get("https://library-mini.xyz/api/v1/auth/user-profile", {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "user"
                    )}`,
                },
            })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
                addNoti("Time out", "fail");
                history.push("/loginPage");
            });
    }, []);
    return (
        <motion.div
            initial={{ opacity: 0.4, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.component}
        >
            <div className={styles.userInfo}>
                <div className={styles.boxInfo}>
                    <label className={styles.label}>Email</label>
                    <p className={styles.content}>{user.email}</p>
                </div>
                <div className={styles.boxInfo}>
                    <label className={styles.label}>Username</label>
                    <p className={styles.content}>{user.name}</p>
                </div>
            </div>
            <div className={styles.changePassword}>
                <input
                    type="password"
                    placeholder="Current Password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                    className={styles.input}
                />
                <span className={styles.span}></span>
                <input
                    type="password"
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newpassword}
                    className={
                        spanNewPassword !== ""
                            ? styles.input_warn
                            : styles.input
                    }
                    onBlur={() => checkvalid("newpassword")}
                    onFocus={() => setSpanNewPassword("")}
                />
                <span className={styles.span}>{spanNewPassword}</span>
                <input
                    type="password"
                    placeholder="Confirm new Password"
                    onChange={(e) => setReNewPassword(e.target.value)}
                    value={reNewpassword}
                    className={
                        spanReNewPassword !== ""
                            ? styles.input_warn
                            : styles.input
                    }
                    onBlur={() => checkvalid("confirmpassword")}
                    onFocus={() => setSpanReNewPassword("")}
                />
                <span className={styles.span}>{spanReNewPassword}</span>
                <button className={styles.btn} onClick={handleChangePassword}>
                    {t("ChangePass")}
                </button>
            </div>
        </motion.div>
    );
}

export default UserComponent;
