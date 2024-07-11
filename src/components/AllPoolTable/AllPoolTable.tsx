
import TableSkeleton from '@/shared/TableSkeleton'
import styles from "./AllPoolTable.module.scss"
import React from 'react'

const AllPoolTable = ({ loading, selectPlanLp, handleClick, data }: any) => {

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
        loading ? (
          <TableSkeleton />
        ) : (
          <>

            {data?.data.poolInfoArray?.length == 0 ? (
              <div className="flex flex-col items-center justify-center py-8 h-full">
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
                      Total Staked LP
                    </th>
                    {/* <th scope="col" className={styles.th_text}>
                      APY
                    </th> */}
                    <th scope="col" className={styles.th_text}>
                      Service Fee

                    </th>

                    <th scope="col" className={styles.th_text}>
                      APR

                    </th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {data?.data?.map((item: any, index: any) => {
                          
                      return (
                        <tr key={index} className={styles.table_row} onClick={() => handleClick(item)}>


                          <td className={styles.table_col}>

                            <div className={`${styles.mainbg} ${selectPlanLp && selectPlanLp.pid === item.pid ? styles.active : null}`} onClick={() => handleClick(item)}>
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
                            {item.zentuPerBlock}
                          </td>


                

                          <td className={styles.table_col}>
                            {item.totalStakeInPool}
                          </td>

            
                          <td className={styles.table_col}>


                            {item.serviceFee} ETH


                          </td>

                          <td className={styles.table_col}>


                            {(item.apy?.toFixed(2))} %


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
    </div >
  )
}

export default React.memo(AllPoolTable) 