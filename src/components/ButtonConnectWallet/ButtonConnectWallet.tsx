"use client"
import Image from 'next/image'
import logout from "../../../public/icons/logout.png"
import React, { useEffect, useRef, useState } from 'react'
import styles from "./ButtonConnectWallet.module.scss"
import metamaskImage from "../../../public/icons/metamask.png"
import useWalletConnection from '@/hooks/useConnection'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import ImageW from "../../../public/images/wallet.png"


const ButtonConnectWallet = () => {
    const { connectWallet, handleSignOut } = useWalletConnection();
    const connectedWallet = useAppSelector((state: any) => state.wallet.metaMaskWallet.signedAccount);
    const btnRef : any = useRef();
    const [open, setOpen] = useState<boolean>(false);



    const hanldeCheckWallet = () => {
        if (connectedWallet) {
            setOpen(!open)
        }
        else {
            connectWallet()
        }
    }

    const handleLogOut = () => {
        handleSignOut()
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (btnRef.current && !btnRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [btnRef]);


    return (
        <>
            <div className={styles.btnContainer} onClick={hanldeCheckWallet}  ref={btnRef} > 
                <span className={`${styles.btn} ${connectedWallet ? "w-full px-4 justify-between" : "w-full px-4 justify-center"}`} >
                    {connectedWallet ? (
                        <span className="flex gap-2 justify-between">
                            <Image src={metamaskImage} width={30} height={40} quality={100} priority alt="imag_0" />
                            {connectedWallet?.length > 0 ? `${connectedWallet.slice(0,8)}....${connectedWallet.slice(-8)}` : connectedWallet}
                            {
                                open ? (
                                    <MdKeyboardArrowUp className={styles.icons} />
                                ) : (
                                    <MdKeyboardArrowDown className={styles.icons} />
                                )
                            }

                        </span>) : <span className='gap-2 flex items-center justify-center'> <Image src={ImageW} width={20} height={40} quality={100} priority alt="imag_0" /> Connect Wallet</span>
                    }
                </span>


                {(open  && connectedWallet) && (
                    <div
                        className={styles.btnLogOut}
                        onClick={handleLogOut}
                      

                    >
                        <Image src={logout} alt="logout image" width={30} height={30} className={styles.imageLogOut} />
                        <p className={styles.textlogOut}>Log Out</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default ButtonConnectWallet