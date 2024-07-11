import React from 'react'
import styles from "./TableSkeleton.module.scss"

const TableSkeleton = () => {
    return (
        <table className={styles.table}>
            <thead className={styles.thead}>
                <tr>
                    <th scope="col" className={styles.th}>
                        <p className={styles.p}></p>
                    </th>
                    <th scope="col" className={styles.th}>
                        <p className={styles.p}></p>
                    </th>
                    <th scope="col" className={styles.th}>
                        <p className={styles.p}></p>
                    </th>
                    <th scope="col" className={styles.th}>
                        <p className={styles.p}></p>
                    </th>
                    <th scope="col" className={styles.th}>
                        <p className={styles.p}></p>
                    </th>
                </tr>
            </thead>

            <tbody>
                <>
                    <tr className={styles.trbody}>
                        <td className={styles.td}>
                            <p className={styles.p}></p>
                        </td>
                        <td className={styles.td}>
                            <p className={styles.p}></p>
                        </td>
                        <td className={styles.td}>
                            <p className={styles.p}></p>
                        </td>

                        <td className={styles.td}>
                            <p className={styles.p}></p>
                        </td>
                        <td className={styles.td}>
                            <p className={styles.p}></p>
                        </td>
                    </tr>


                    <tr className={styles.trbody}>
                        <td className={styles.td}>
                            <p className={styles.p}></p>
                        </td>
                        <td className={styles.td}>
                            <p className={styles.p}></p>
                        </td>
                        <td className={styles.td}>
                            <p className={styles.p}></p>
                        </td>

                        <td className={styles.td}>
                            <p className={styles.p}></p>
                        </td>
                        <td className={styles.td}>
                            <p className={styles.p}></p>
                        </td>
                    </tr>


                    <tr className={styles.trbody}>
                        <td className={styles.td}>
                            <p className={styles.p}></p>
                        </td>
                        <td className={styles.td}>
                            <p className={styles.p}></p>
                        </td>
                        <td className={styles.td}>
                            <p className={styles.p}></p>
                        </td>

                        <td className={styles.td}>
                            <p className={styles.p}></p>
                        </td>
                        <td className={styles.td}>
                            <p className={styles.p}></p>
                        </td>
                    </tr>
                </>
            </tbody>
        </table>
    )
}

export default TableSkeleton