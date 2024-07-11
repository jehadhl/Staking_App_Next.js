import { ClaimRewadsType } from '@/utils/types'
import React from 'react'
import styles from "./ClaimRewards.module.scss"
import Image from 'next/image'
import logoImage from "../../../../public/images/logoImage.png"


const ClaimRewards = ({ zentToken, isLoadingMyStack , getRewards }: any) => {


    return (
        <div className={styles.card}>
            <div className={styles.cardFlex}>
                <div className={styles.infoZent}>
                    <div className={styles.image_wrapper}>
                        <Image
                            src={logoImage}
                            width={50}
                            height={50}
                            alt='image_0'
                            quality={100}
                            priority
                        />
                        <div>
                            <h1 className='S-1060:text-lg S-280:text-sm text-white font-bold'>Available Rewards  </h1>
                            <div className={styles.totalPrice}>
                                {isLoadingMyStack ? <div className={styles.skeloading} /> : (<h1 className={styles.text}>{zentToken ? zentToken?.toFixed(8) : "0"}  </h1>)}
                                <span className={styles.spanText}>ZENT</span>
                            </div>
                        </div>

                    </div>

                

                    <button disabled={zentToken === 0 || zentToken === ""} className={` ${zentToken === 0 || zentToken === "" ? styles.disbled : styles.btn}`} onClick={getRewards} >
                        Claim Reward
                    </button>



                </div>


            </div>
        </div>
    )
}

export default ClaimRewards