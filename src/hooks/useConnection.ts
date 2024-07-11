import { useAppSelector } from '@/redux/hook'
import { ethers } from "ethers";
import { toggleSignupModal, setConnectWallet, signOut, addSignedSelectedAccount, addUserData, cancelSignModal } from "../redux/slices/walletSlice"
import toast from "react-hot-toast";
import { getNonce, registerWallet } from '@/api/auth';
import {  isMobileDevice, setUserToken } from '@/utils/helpers';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { DAP_URL } from '@/utils/constants';
import { setAmout, setSelect } from '@/redux/slices/selectSlice';


export default function useWalletConnection() {
    // @ts-ignore
    const { ethereum = null } = window;
    const provider: any = ethereum
        ? new ethers.providers.Web3Provider(ethereum)
        : null;
    const router = useRouter()
    const path = usePathname()
    const [loading, setLoading] = useState(false)
    



    const dispatch = useDispatch();

    const addAccount = async () => {
        if (ethereum) {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
          
            if (!!accounts.length) {
                dispatch(toggleSignupModal(true));
            }
            else {
                toast.error("Install the metamask")
            }
        }
        else {
            toast.error("Install the metamask")
        };
    };

    const openMetaMaskUrl = async () => {
        if (!ethereum) {
            if (isMobileDevice()) {
                const a = document.createElement("a");
                a.href = DAP_URL;
                a.target = "_self";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }
        }
    };

    const connectWallet = () => {
        openMetaMaskUrl();
        dispatch(setConnectWallet(true));
        try {
            addAccount()
            dispatch(setConnectWallet(false));
        }
        catch (err: any) {
            if (err.code === -32002) toast.error("Request already pending");
            else toast.error(err.message || "Something went wrong");
        }
    };

    const handleSignOut = () => {
        dispatch(signOut());
        dispatch(setSelect("lpStakingContract"))
        if (path === "/") {
            window.location.reload()
        }
        else {
            router.push("/")
        }
    }

    const handleChnageAccount = async (...args: any) => {
        const accounts = args[0];
        dispatch(setAmout(""))
        if (accounts?.length === 0) {

            dispatch(addSignedSelectedAccount(null));
            if (path === "/") {
                window.location.reload();

            }
            else {
                router.push("/")

            }
        } else {
            dispatch(toggleSignupModal(true));

        }

    }

    const handleSignWallet = async () => {
        try {
            setLoading(true)
            let addresses = await ethereum.send("eth_requestAccounts");
            const provider = ethereum
                ? new ethers.providers.Web3Provider(ethereum)
                : null;
            const signer = provider?.getSigner();
         
            if (addresses && addresses.result.length) {
                const {
                    isSuccess,
                    data,
                    statusCode: nonceStatusCode,
                }: any = await getNonce(addresses.result[0]);
                const address = await signer?.getAddress();
                // nonce code
                const { nonce } = data;

                const signature = await provider?.send("personal_sign", [
                    address,
                    nonce,
                ]);

                const {
                    data: regRes,
                    isSuccess: isRegisterSuccess,
                    statusCode,
                }: any = await registerWallet(addresses.result[0], signature)

    
                const { accessToken, memo, _id } = regRes;

    
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 1);
                setUserToken(accessToken, {
                    expires: expirationDate,
                })
                dispatch(addUserData({
                    userId: _id,
                    userMemo: memo,
                    address,
                    accessToken,

                }
                ))

                if (path === "/") {
                    dispatch(toggleSignupModal(false));
                    setLoading(false)
                }

                else {
                    router.push("/")
                    dispatch(toggleSignupModal(false));
                    setLoading(false)
                }

                dispatch(toggleSignupModal(false));
                setLoading(false)

                toast.success("Signature Successful.")
            }
        }
        catch (error: any) {

            setLoading(false)
            if (error?.code === 4001) dispatch(cancelSignModal(false));
            toast.error("User denied message signature.")
        }
    }



    return {
        connectWallet,
        handleSignOut,
        handleChnageAccount,
        handleSignWallet,
        loading,


    }
}