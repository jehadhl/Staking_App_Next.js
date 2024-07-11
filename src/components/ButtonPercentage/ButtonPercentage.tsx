import React from 'react'
import styles from "./ButtonPercentage.module.scss"

type Props = {
  value: string | number | any,
  handleClickPercentage: (valPer: string) => void,
  percentage: any ,
  label : any
}

const ButtonPercentage = ({ value, handleClickPercentage, percentage , label }: Props) => {
  return (
    <button className={`${styles.btn} ${percentage === value ? styles.active : ""}`} onClick={() => handleClickPercentage(value)}>
      {label}
    </button>
  )
}

export default ButtonPercentage