import React from 'react'
import Background5 from '../../Template/Background5/Background5'
import styles from './UserPage.module.scss'
import UserComponent from '../../MoreClues/UserComponent/UserComponent'

function UserPage() {
    return (
        <Background5>
            <div className={styles.component}>
                <UserComponent/>
            </div>
        </Background5>
    )
}

export default UserPage
