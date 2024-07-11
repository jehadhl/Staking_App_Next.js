"use client"
import React from 'react'
import styles from "./TokenStakingTable.module.scss"
import TableSkeleton from '@/shared/TableSkeleton'
import { format } from "date-fns";
import Image from 'next/image';
import ImageF from "../../../public/images/Illustration.png"


const TokenMyStakingTable = ({ data, loading, handleSelectSimpleTokenData, selectedSimpleToken
}: any) => {


    return (
        <div className={`${styles.main} ${data?.data?.poolInfo.length >= 5 && styles.overflowShow}`}>

            {
                loading ? (
                    <TableSkeleton />
                ) : (
                    <>
                        {data?.data?.poolInfo?.length == 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 h-full">
                                <Image src={ImageF} alt='image_0' width={200} height={120} quality={100} />
                                <h1 className="py-2 text-3xl font-bold text-center text-white">
                                    No Data Found
                                </h1>
                            </div>
                        ) : (
                            <table className={styles.table}>
                                <thead className={styles.table_head} >
                                    <tr>
                                        <th scope="col" className={styles.th_text} style={{ width: "40px" }}>
                                        </th>

                                        <th scope="col" className={styles.th_text} >
                                            Pool ID
                                        </th>


                                        <th scope="col" className={styles.th_text}>
                                            Duration
                                        </th>

                                        <th scope="col" className={styles.th_text}>
                                            total Staked
                                        </th>




                                        <th scope="col" className={styles.th_text}>
                                            Start Time
                                        </th>

                                        <th scope="col" className={styles.th_text}>
                                            End Time
                                        </th>





                                        <th scope="col" className={styles.th_text}>
                                            Status
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <>
                                        {data?.data?.poolInfo?.map((item: any, index: number) => {
                                            const givenDate = new Date(item.unlockTime);
                                            const newDate = new Date();

                                            const isBefore = givenDate > newDate;
                                            const isAfter = givenDate < newDate;
                                            return (

                                                <tr key={index} className={styles.table_row} onClick={() => handleSelectSimpleTokenData(item)}>
                                                    <td className={styles.table_col} style={{ width: "40px" }}>

                                                        <div className={`${styles.mainbg} ${selectedSimpleToken && selectedSimpleToken.index === item.index ? styles.active : null}`} onClick={() => handleSelectSimpleTokenData(item)}>
                                                            <div className={styles.childbg} />
                                                        </div>

                                                    </td>
                                                    <td className={styles.table_col} style={{ width: "120px" }}>
                                                        {item.did}
                                                    </td>
                                                    <td className={styles.table_col}>
                                                        {item.duration}
                                                    </td>

                                                    <td className={styles.table_col}>
                                                        {item.totalStaked} ZENT
                                                    </td>


                                                    <td className={styles.table_col}>
                                                        {format(item.stakeTime, 'yyyy-MM-dd hh:mm')}
                                                    </td>

                                                    <td className={styles.table_col}>
                                                        {format(item.unlockTime, 'yyyy-MM-dd hh:mm')}
                                                    </td>



                                                    <td className={styles.table_col}>
                                                        {
                                                            item.isWithdrawUnlocked ? (
                                                                <div className={styles.completed}>
                                                                    <h1 className={styles.text}> Completed</h1>
                                                                </div>

                                                            ) : (
                                                                <div className={styles.onGoing}>
                                                                    <h1 className={styles.text}>Ongoing</h1>
                                                                </div>
                                                            )
                                                        }
                                                    </td>


                                                    {/* <td className={styles.table_col}>
                                                        {
                                                            item.totalStaked !== 0 ? (
                                                                <button className={styles.btn} onClick={() => unStackRewards(item.did, item.transactionId, item.totalStaked , item.unlockTime , item.rewardClaimable)}>
                                                                    Claim
                                                                </button>
                                                            ) : <div className={styles.claimed}>
                                                                <h1 className={styles.text}>Claimed</h1>
                                                            </div>}

                                                    </td> */}
                                                </tr>
                                            )
                                        })}
                                    </>
                                </tbody>
                            </table>
                        )}
                    </>
                )
            }
        </div >
    )
}

export default TokenMyStakingTable