import React from 'react'
import styles from "./CardSkelerton.module.scss"

const CardSkeleton = () => {
  return (
   <div className={styles.card}>
      <div className={styles.skeLine}/>
      <div className={styles.line} />
      <div  className={styles.skeLine}/>
      <div  className={styles.skeLine}/>
      <div  className={styles.skeLine}/>
      <div  className={styles.skeLine}/>
      <div  className={styles.skeLine}/>
      <div  className={styles.skeLine}/>   
   </div>
  )
}

export default CardSkeleton