import React from 'react'
import styles from "./PlanSkeleton.module.scss"

const PlanSkeleton = () => {
    return (
        <div className={styles.cardsItems}>

            <div className={styles.header}>
                <div className={styles.circle} />
                <div className={styles.lineText} />
            </div>

            <div className={styles.line} />
            <div className={styles.bodyCard}>
                <div className={styles.head}>
                    <div className={styles.head_text} />
                    <div className={styles.head_text} />
                </div>
                <div className={styles.head}>
                    <div className={styles.head_text} />
                    <div className={styles.head_text} />
                </div>

                <div className={styles.head}>
                    <div className={styles.head_text} />
                    <div className={styles.head_text} />
                </div>

                <div className={styles.head}>
                    <div className={styles.head_text} />
                    <div className={styles.head_text} />
                </div>
            </div>
        </div>
    )
}

export default PlanSkeleton