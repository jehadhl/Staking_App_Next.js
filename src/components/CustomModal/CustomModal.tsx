import type { CustomModal } from "@/utils/types"
import styles from "./CustomModal.module.scss"


const CustomModal = ({
    open,
    close,
    width,
    type,
    zindex,
    children
}: CustomModal) => {
    if (!open) return null;
    return (
        <>
            <div className={`${styles.card}  `} style={{ zIndex: zindex, maxWidth: width }}>
                <div className={`relative  my-6 mx-auto   flex justify-center`}>
                    <div
                        className={`${type === "unStake" ? "block" : "flex items-center flex-col"} gap-7 p-4 md:p-6 lg:p-6  rounded-xl  backdrop-blur-xl bg-darkGray relative w-full`}
                    >

                        {
                            type === "unStake" ? (
                                <div className="flex justify-between items-center">

                                    <h1 className="text-white font-medium"> Please select the transaction(s) you wish to unstake.</h1>

                                    <div
                                        className="text-white  top-4 right-4 border px-1.5 py-0.5 md:px-2 md:py-1 rounded text-center cursor-pointer text-[10px] md:text-[11px]"
                                        onClick={close}
                                    >
                                        X
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="text-white  absolute top-4 right-4 border px-1.5 py-0.5 md:px-2 md:py-1 rounded text-center cursor-pointer text-[10px] md:text-[11px]"
                                    onClick={close}
                                >
                                    X
                                </div>
                            )
                        }

                        {children}
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default CustomModal