"use client"
import networkImage from "../../../public/images/icons8-ok 1.png"
import React, { useEffect } from 'react'
import CheckNeworkModal from '../CustomModal/CheckNeworkModal';
import styles from "../../components/Web3/Web3.module.scss"
import Image from 'next/image';
import { cancelSignModal } from "@/redux/slices/walletSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"
import { useCheckNetwork } from "@/hooks/useCheckNetwork";
import { PuffLoader } from "react-spinners";


const CheckNetwork = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const { switchNetworkP, ethereum, loading, handleOpen } = useCheckNetwork()
    const { switchNetwork } = useSelector((state: any) => state.wallet)


    useEffect(() => {
        ethereum?.on('chainChanged', handleOpen);

        return () => {
            ethereum?.removeListener('chainChanged', handleOpen);
        };
    }, [handleOpen]);

    const handleClose = () => {
        dispatch(cancelSignModal(false))
        router.push("/")
    }

    return (
        <>
            {
                switchNetwork && (
                    < CheckNeworkModal
                        open={switchNetwork}
                        close={() => handleClose()}
                        width="w-[420px]"
                        zIndex={6000}
                    >
                        <div className="flex flex-col gap-2 md:gap-3 w-full items-center py-4 md:py-2 px-2 ">

                            <div className="min-w-[400px] mt-0 pt-0">
                                <p className=" text-white text-2xl md:text-base text-center mt-1 font-semibold">
                                    Switch Network
                                </p>
                            </div>
                            <Image src={networkImage} alt="img_metaMask" />
                            <div className="flex flex-col gap-3 w-full mt-3">
                                <button className={styles.btn} onClick={switchNetworkP}>Switch</button>
                            </div>
                        </div>
                    </CheckNeworkModal >
                )
            }




            {loading ? (
                <div className="fixed  top-0 left-0 right-0 w-full h-full bg-black/10 backdrop-opacity-16  backdrop-blur-[0.5px]  z-[10000]"></div>
            ) : null}

            <>
                <div
                    className={`${styles.modal} ${loading ? styles.modalshow : ""
                        }`}
                >
                    <div className={styles.modalBox}>
                        <div className="relative w-auto mx-auto my-6">
                            <div className={styles.modalclose}>
                                <div className="flex items-center justify-center w-full mb-2">
                                    <PuffLoader color="#36d7b7" className='w-[280px] h-[280px]' size={80} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </>

        </>
    )
}

export default CheckNetwork