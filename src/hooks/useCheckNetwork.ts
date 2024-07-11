import { setSwitchNetwork } from "@/redux/slices/walletSlice";
import { ethers } from "ethers";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export const useCheckNetwork = () => {
    const openRef = useRef(false);
    const [loading, setLoading] = useState(false)
    const { network } = useSelector((state: any) => state.wallet)


    // @ts-ignore
    const { ethereum = null } = window;
    const dispatch = useDispatch()

    const handleOpen = useCallback((chainIdProp: any) => {
        const networkCode = Number(chainIdProp) || Number(ethereum.networkVersion);
        const chainId = parseInt(`${network.chainId}`, 16);
        if (networkCode === chainId) {
            dispatch(setSwitchNetwork(false))
        }
        else{
            dispatch(setSwitchNetwork(true)) 
        }
    },[dispatch , network.chainId, ethereum])

    const checkNetwork = async () => {
        const newProvider: any = ethereum ? new ethers.providers.Web3Provider(ethereum) : null;
        try {
            const network = await newProvider.getNetwork();
            const hexChainId = "0x" + network.chainId.toString(16);
            return hexChainId
                ;
        } catch (error) {

            toast.error(`Error getting network, ${error}`);
        }
    };



    const switchNetworkP = async () => {
        setLoading(true)
        const currentNetwork = await checkNetwork();
        dispatch(setSwitchNetwork(false))
        if (currentNetwork !== network.chainId) {
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: `${network.chainId}` }],
                });
                setLoading(false)
                dispatch(setSwitchNetwork(false))
            } catch (error: any) {
                toast.error(`Error switching network:, ${error.message}`)
                dispatch(setSwitchNetwork(false))
                if (error?.code === 4001) {
                    await ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: `${network.chainId}` }],
                    });
                    setLoading(false)
                }
                setLoading(false)
            }

        } else {
            dispatch(setSwitchNetwork(false))
            setLoading(false)
            toast.error(`Already connected to the desired network:, ${network.name}`)
        }
    };


    return {
        openRef,
        switchNetworkP,
        ethereum,
        handleOpen,
        loading
    };
};