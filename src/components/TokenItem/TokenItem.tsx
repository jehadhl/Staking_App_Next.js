import { TokeItemType } from '@/utils/types'
import styles from "./TokenItem.module.scss"
import React from 'react'
import { IoMdCheckmark } from 'react-icons/io'
import Image from 'next/image'
import Icon from "../../../public/images/icon.svg"

const TokenItem: React.FC<TokeItemType> = ({ item, active, handleClick, contractAddress }) => {


    function formatNumber(num: number) {
        if (num >= 1e6) {
            return (num / 1e6)?.toFixed(1) + 'M';
        } else if (num >= 1e3) {
            return (num / 1e3)?.toFixed(1) + 'k';
        } else {
            return num?.toFixed(1);
        }
    }


    return (
        <div className={`${styles.sec}  ${active === "token" ? styles.activeBackground : ''} ${item.isEnabled ? "cursor-pointer" : "cursor-not-allowed"}`} key={item._id}
            onClick={() => {
                if (item.isEnabled) {
                    handleClick("token", contractAddress?.simpleStakingContractAddress)
                }
                else {
                    return
                }
            }}
        >

            <div className={styles.sec_header}>

                <div className={styles.sec_header_left}>
                    <div className={styles.sec_header_left_circle} />
                    <h1 className={styles.sec_header_left_text}>{item.title}</h1>
                </div>


                {item.isEnabled && (
                    <div className='cursor-pointer' onClick={() => handleClick("token", contractAddress?.simpleStakingContractAddress)}>
                        {active == "token" ? (
                            <div className={styles.check}> <IoMdCheckmark /> </div>
                        ) : (
                            <div className={styles.notcheck} />
                        )}

                    </div>
                )}


            </div>

            <div className={styles.line} />



            <div className={`${item?.isEnabled === false && "blur-[5px] w-full h-full inset-0  "}`} style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}>


                <div className={styles.info_rewardsToken}>
                    <div className={styles.info_content}>
                        <h1 className={styles.rewardToken_text}>Reward Token</h1>
                        <h1 className={styles.rewardToken_text}>{item.rewardToken}</h1>
                    </div>

                    <div className={styles.info_content}>
                        <h1 className={styles.info_text}>TVL in USDT</h1>
                     <h1 className={styles.info_text}>${(typeof item.tvl === 'number') ? formatNumber(item.tvl) : ''}</h1>
                    </div>


                    <div className={styles.info_content}>
                        <h1 className={styles.info_text}>TVL in ZENT</h1>
                        
                          <h1 className={styles.info_text}>{(typeof item.tvl === 'number') ? formatNumber(item.tvlInZentu) : ''}</h1>
                    </div>


                    {
                        item.tag === "token" && (
                            <>
                                <div className={styles.info_content}>
                                    <h1 className={styles.info_text}>Duration</h1>
                                    <h1 className={styles.info_text}>
                                        {item.duration.map((data: any, index: number) => {

                                            return (
                                                <span key={index}>
                                                    {data}d {index < item.duration?.length - 1 && " | "}
                                                </span>
                                            );
                                        })}

                                    </h1>
                                </div>




                                <div className={styles.info_content}>
                                    <h1 className={styles.info_text}>Network</h1>
                                    <h1 className={styles.info_text}>{item.network}</h1>
                                </div>

                                <div className={styles.info_content}>
                                    <h1 className={styles.info_text}>APY</h1>
                                    <h1 className={styles.info_text}>{item.apy}%</h1>
                                </div>

                                <div className={styles.info_content}>
                                    <h1 className={styles.info_text}>Daily Rewards</h1>
                                    <h1 className={styles.info_text}>288000 ZENT</h1>
                                </div>

                            </>
                        )
                    }
                </div>


                <div>
                    <p className={styles.description}>
                        Maximize the value of your ZENT holdings by earning rewards through token-only staking and contributing to the network's security and operations.
                    </p>
                </div>


            </div>

            {
                item?.isEnabled === false && (
                    <div className="flex  flex-col w-full justify-center absolute z-20  top-[50%] items-center left-0" style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}>
                        <p className="w-full h-full text-base font-medium text-center md:text-2xl text-Primary">
                            <span className="px-3 py-2 text-white flex justify-center items-center gap-2"> <Image src={Icon} width={25} height={25} alt='image_0' /> Coming Soon</span>
                        </p>
                    </div>
                )
            }



        </div>
    )
}

export default TokenItem

// onClick={() => handleClick("token", contractAddress?.simpleStakingContractAddress)}