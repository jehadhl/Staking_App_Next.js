"use client"
import styles from "./Web3.module.scss"
import useWalletConnection from '@/hooks/useConnection';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import React, { useEffect } from 'react'
import CustomModal from '../CustomModal/CustomModal';
import { cancelSignModal } from '@/redux/slices/walletSlice';
import Image from 'next/image';
import metamask from "../../../public/icons/metamask.png"
import networkImage from "../../../public/images/icons8-ok 1.png"
import { PuffLoader } from "react-spinners";
import { useRouter } from "next/navigation"
import CheckNeworkModal from "../CustomModal/CheckNeworkModal";
import { useDispatch } from "react-redux";


const Web3 = () => {
    // @ts-ignore
    const { ethereum = null } = window;
    const { handleChnageAccount, handleSignWallet, loading } = useWalletConnection()
    const { signUpModal } = useAppSelector((state) => state.wallet)

    const dispatch = useDispatch();
    const router = useRouter()

    useEffect(() => {
        ethereum?.on("accountsChanged", handleChnageAccount);

        return () => {
            ethereum?.removeListener("accountsChanged", handleChnageAccount);
        };
    }, []);



    const handleClose = () => {
        dispatch(cancelSignModal(false))
        router.push("/")
    }



    return (
        <>
            <CustomModal
                open={signUpModal}
                close={() => handleClose()}
                width="400px"
                zindex={1000}
            >
            
                    <div className="flex flex-col gap-2 md:gap-3 w-full items-center py-4 md:py-2 px-2 ">
                        <Image src={metamask} alt="img_metaMask" />
                        <div className=" mt-0 pt-0">
                            <div className="text-white text-center w-full text-base md:text-lg font-[500]">
                                Connect to your MetaMask Wallet
                            </div>
                            <p className=" text-[#9CA4AB] text-sm md:text-base text-center mt-1">
                                Sign in to your wallet
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 w-full mt-3">
                            <button className={styles.btn} onClick={handleSignWallet}>Sign In</button>
                        </div>
                    </div>
            
            </CustomModal>




            {loading ? (
                <div className="fixed  top-0 left-0 right-0 w-full h-full bg-black/10 backdrop-opacity-16  backdrop-blur-[0.5px] "></div>
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

export default Web3