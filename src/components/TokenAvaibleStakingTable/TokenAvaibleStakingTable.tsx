import React from 'react'
import styles from "./TokenAvaibleStakingTable.module.scss"
import TableSkeleton from '@/shared/TableSkeleton'
import { format } from "date-fns";
import Image from 'next/image';
import ImageF from "../../../public/images/Illustration.png"

const TokenAvaibleStakingTable = ({ selectedSimpleToken, loadingPlan, plan, handleSelectSimpleToken }: any) => {


    return (
        <div className={styles.main}>

            {
                loadingPlan ? (
                    <TableSkeleton />
                ) : (
                    <>
                        {plan?.data?.length == 0 ? (
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
                                            ID
                                        </th>
                                        <th scope="col" className={styles.th_text}>
                                            Duration
                                        </th>
                                        <th scope="col" className={styles.th_text}>
                                            RPB ZENT
                                        </th>

                                        <th scope="col" className={styles.th_text}>
                                        Total Staked ZENT 
                                        </th>

                                      

                                        <th scope="col" className={styles.th_text}>
                                            service fee
                                        </th>

                                        <th scope="col" className={styles.th_text}>
                                           APY
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <>
                                        {plan?.data?.map((item: any, index: number) => {
                                            return (
                                                <tr key={index} className={styles.table_row} >

                                                    <td className={styles.table_col}>
                                                        {item.did}
                                                    </td>
                                                    <td className={styles.table_col}>
                                                        {item.duration}
                                                    </td>
                                                    <td className={styles.table_col} style={{ width: "120px" }}>
                                                        {item.zentuPerBlock}
                                                    </td>
                                                    <td className={styles.table_col} >
                                                        {item.zentuStaked} ZENT
                                                    </td>

                                                
                                                    <td className={styles.table_col}>
                                                        {item.serviceFee} ETH
                                                    </td>

                                                    <td className={styles.table_col} >
                                                        {item.apy} %
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </>
                                </tbody>

                            </table>
                        )
                        }
                    </>
                )}


        </div>
    )
}

export default React.memo(TokenAvaibleStakingTable)