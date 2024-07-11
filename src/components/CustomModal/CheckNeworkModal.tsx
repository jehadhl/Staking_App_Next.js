import React from 'react'
import styles from "./CustomModal.module.scss"

const CheckNeworkModal = ({ children , open , close ,   zIndex }: any) => {
    if (!open) return null;
    return (
        <>
            <div className={`${styles.card} `} style={{zIndex : zIndex}}>
            <div className={`relative w-auto my-6 mx-auto max-w-[480px]`}>
                    <div
                        className={`flex flex-col items-center gap-7 p-4 md:p-6 lg:p-8 max-w-[300px] rounded-xl md:max-w-[550px] backdrop-blur-xl bg-darkGray relative `}
                    >
                        <div
                            className="text-white absolute top-4 right-4 border px-1.5 py-0.5 md:px-2 md:py-1 rounded text-center cursor-pointer text-[10px] md:text-[11px]"
                            onClick={close}
                        >
                            X
                        </div>
                        {children}
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default CheckNeworkModal