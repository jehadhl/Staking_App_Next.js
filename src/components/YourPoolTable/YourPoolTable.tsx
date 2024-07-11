"use client"
import React from 'react'
import styles from "./YourPoolTable.module.scss"
import Image from 'next/image';
import ImageF from "../../../public/images/Illustration.png"
import TableSkeleton from '@/shared/TableSkeleton'


const YourPoolTable = ({ data, isLoadingMyStack, selectedLp, handleClick }: any) => {

    function formatNumber(num : any) {
        if (num >= 1e6) {
            return (num / 1e6).toFixed(1) + 'M';
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(1) + 'k';
        } else {
            return num.toFixed(1);
        }
    }
    

    return (
        <div className={styles.main}>

            {
                isLoadingMyStack ? (
                    <TableSkeleton />
                ) : (
                    <>
                        {data?.data?.poolInfo?.length == 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 h-[350px]">
                                <Image src={ImageF} alt='image_0' width={170} height={120} quality={100} />
                                <h1 className="py-2 text-3xl font-bold text-center text-white">
                                    No Data Found
                                </h1>
                            </div>
                        ) : (
                            <table className={styles.table}>
                                <thead className={styles.table_head} >
                                    <tr>
                                        <th scope="col" className={styles.th_text}>
                                        </th>
                                        <th scope="col" className={styles.th_text}>
                                            Pool ID
                                        </th>
                                        <th scope="col" className={styles.th_text}>
                                            Name
                                        </th>
                                        <th scope="col" className={styles.th_text}>
                                            RPB ZENT
                                        </th>

                                        {/* <th scope="col" className={styles.th_text}>
                      Liquidity                                </th> */}
                                        <th scope="col" className={styles.th_text}>
                                            LPT Staked
                                        </th>
                                        {/* <th scope="col" className={styles.th_text}>
                      APY
                    </th> */}
                                      

                                        <th scope="col" className={styles.th_text}>
                                            Daily Rewards
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <>
                                        {data?.data?.poolInfo.map((item: any, index: any) => {

                                            return (
                                                <tr key={index} className={styles.table_row} onClick={() => handleClick(item)}>


                                                    <td className={styles.table_col}>

                                                        <div className={`${styles.mainbg} ${selectedLp && selectedLp.pid === item.pid ? styles.active : null}`} onClick={() => handleClick(item)}>
                                                            <div className={styles.childbg} />
                                                        </div>
                                                    </td>

                                                    <td className={styles.table_col}>
                                                        {item.pid}
                                                    </td>


                                                    <td className={styles.table_col}>
                                                        {item.name}
                                                    </td>

                                                    <td className={styles.table_col}>
                                                        {item.userRpb}
                                                    </td>


                                                    {/* 
                          <td className={styles.table_col}>
                            {item.liquidity}
                          </td> */}

                                                    <td className={styles.table_col}>
                                                        {item.lptStaked}
                                                    </td>

                                                    {/* <td className={styles.table_col}>
                            {item.apy === null ? "____" : item.apy}
                          </td> */}


                                              


                                                    <td className={styles.table_col}>
                                                        {(item.userRpb * 7200).toFixed(2)} ZENT
                                                    </td>
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
        </div>
    )
}

export default React.memo(YourPoolTable)