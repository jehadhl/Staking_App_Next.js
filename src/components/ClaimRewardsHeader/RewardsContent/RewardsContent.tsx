import React from 'react'
import styles from './RewardsContent.module.scss'
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from 'next/navigation';
interface Props {
  text: string,
  label: string,
  nameToken: string
}

const RewardsContent = ({ text, label, nameToken }: Props) => {
  const router = useRouter()

  const handleClick = () => {

    
      router.push("/")
    
  }
  return (
    <div className={styles.content}>
      <div>
        <BsArrowLeft className='text-white w-5 h-5 text-3xl mt-3 cursor-pointer' onClick={handleClick} />
      </div>
      <div>
        <h1 className={styles.text}>{text}</h1>
        <p className={styles.label}>{label}</p>
      </div>
    </div>
  )
}

export default RewardsContent