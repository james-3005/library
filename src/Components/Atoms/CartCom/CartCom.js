import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./cartComponent.module.scss";
function CartCom() {
    const history = useHistory();
    return (
        <div className={styles.cart}>
            <div
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/paymentPage")}
            >
                <img src="/Image/svg/cart.svg" />
            </div>
            <div class={styles.total}>
                <p>$1.12</p>
            </div>
        </div>
    );
}

export default CartCom;
