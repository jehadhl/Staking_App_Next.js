"use client"
import React, { useEffect } from 'react'
import CheckNetwork from './CheckNetwork/CheckNetwork'
import { Toaster } from 'react-hot-toast'
import Web3 from './Web3'
import Navbar from './Navbar/Navbar'
import { useDispatch } from 'react-redux'
import { signOut } from '@/redux/slices/walletSlice'
import { useRouter } from 'next/navigation'
import { setSelect } from '@/redux/slices/selectSlice'




const App = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    // @ts-ignore
    const { ethereum = null } = window;

    useEffect(() => {
        const checkMetaMaskStatus = async () => {
            if (ethereum) {
                try {

                    const accounts = await ethereum.request({
                        method: 'eth_accounts'
                    });
                    if (accounts.length > 0) {
                        return;
                    }
                    else {
                        dispatch(signOut())
                        dispatch(setSelect("lpStakingContract"))
                        router.push("/")
                    }

                } catch (error) {
                    console.error('Error checking MetaMask status:', error);
                }
            }
        };

        checkMetaMaskStatus();
    }, []);


    return (
        <React.Fragment>
            <Navbar />
            <CheckNetwork />
            <Toaster />
            <Web3 />
        </React.Fragment>

    )
}

export default App