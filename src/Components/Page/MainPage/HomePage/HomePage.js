import React from 'react'
import Background1 from '../../../Template/Background1/Background1'
import styles from './HomePage.module.scss'
import OrangeButton from '../../../Atoms/OrangeButton/OrangeButton'
import { motion } from 'framer-motion'
import RateStar from '../../../MoreClues/RateStar/RateStar'
import {useTranslation} from 'react-i18next'
function Homepage() {
    const { t } = useTranslation();
    return (
        <Background1>
            <motion.p className={styles.name}
                        initial= {{ opacity: 0.4, y: -100}}
                        animate= {{ opacity: 1, y: 0}}>
                        {t("mainPage_name")}
            </motion.p>
            <motion.div className={styles.button}
                        initial= {{ opacity: 0.4, y: -100}}
                        animate= {{ opacity: 1, y: 0}}>
                <OrangeButton size={"medium"} text={t("mainPage_button")}/>
            </motion.div>
            <motion.p   className={styles.title}
                        initial= {{ opacity: 0.4, y: -100}}
                         animate= {{ opacity: 1, y: 0}}>{t("mainPage_title")}</motion.p>
            <motion.p className={styles.title2}
                        initial= {{ opacity: 0.4, y: -100}}
                        animate= {{ opacity: 1, y: 0}}>{t("mainPage_smallTitle")}</motion.p>
        
        </Background1>
    )
}

export default Homepage