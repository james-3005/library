import React from 'react'
import Background2 from '../../Template/Background2/Background2'
import PaymentComponent from '../../MoreClues/PaymentComponent/PaymentComponent'
import styles from './PaymentPage.module.scss'
function PaymentPage() {
    return (
        <Background2>
            <div className={styles.component}>
                <PaymentComponent/>
            </div>
        </Background2>
    )
}

export default PaymentPage
