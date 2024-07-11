import React from 'react'
import styles from "./HistoryLp.module.scss"
import TableSkeleton from '@/shared/TableSkeleton'
import Image from 'next/image'
import ImageF from "../../../public/images/Illustration.png"
import { format } from "date-fns";
import { Pagination } from 'antd'
import NextLink from 'next/link'

const HistoryLp = ({
    history,
    loadingHistory,

}: any) => {
  
    return (
        <div className={styles.main}>

            {
                loadingHistory ? (
                    <TableSkeleton />
                ) : (
                    <>
                        {history?.data?.lpHistory?.length == 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 h-[350px]">
                                <Image src={ImageF} alt='image_0' width={170} height={120} quality={100} />
                                <h1 className="py-2 text-3xl font-bold text-center text-white">
                                    No Data Found
                                </h1>
                            </div>
                        ) : (
                            <>
                                <table className={styles.table}>
                                    <thead className={styles.table_head} >
                                        <tr>

                                            <th scope="col" className={styles.th_text}>
                                                Pool ID
                                            </th>

                                            <th scope="col" className={styles.th_text}>
                                                Type
                                            </th>


                                            <th scope="col" className={styles.th_text}>
                                                Amount
                                            </th>

                                            <th scope="col" className={styles.th_text}>
                                                Date
                                            </th>

                                            <th scope="col" className={styles.th_text}>
                                                Service Fee
                                            </th>
                                            <th scope="col" className={styles.th_text}>
                                                TxID
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            history?.data?.lpHistory.map((item: any, index: any) => {
                                                return (
                                                    <tr key={item._id} className={styles.table_row} >


                                                        <td className={styles.table_col}>

                                                            {item.pid}
                                                        </td>
                                                        <td className={styles.table_col}>

                                                            {item.recordType}
                                                        </td>

                                                        <td className={styles.table_col}>

                                                            {item.amount}
                                                        </td>
                                                        <td className={styles.table_col}>
                                                            {format(item.createdAt, 'yyyy-MM-dd')}
                                                        </td>

                                                        <td className={styles.table_col}>

                                                            {item.serviceFee ? item.serviceFee : 0} ETH

                                                        </td>

                                                        <td className={styles.table_col}>
                                                            <NextLink href={`${process.env.NEXT_PUBLIC_URL_SEPOLIA}/${item?.transactionId}`} target='_blank'>  {item?.transactionId?.length > 0 ? `${item?.transactionId?.slice(0, 6)}..........${item?.transactionId?.slice(-6)}` : item?.transactionId}</NextLink>

                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>

                                </table>


                            </>


                        )}
                    </>
                )}
        </div>
    )
}

export default HistoryLp