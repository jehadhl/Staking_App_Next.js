
import { useAppSelector } from "@/redux/hook";
import lpStakingToken from "../../contracts/zentu-lp-staking-abi.json"
import lpToken from "../../contracts/zentu-lp-token-abi.json"
import rewardZentu from "../../contracts/zentu_rewards_token_api.json"
import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLpToken } from "@/hooks/useLpPool";
import { depositStakeLp, withdrawStakeLp } from "@/api/lpPool";
import { useAvaibleLpPool } from "@/hooks/useAvaibleLpPool";
import { useDispatch } from "react-redux";
import { setAmout, setClaimRewards, setStackedSucessful, setTxId, setUntackedSucessful } from "@/redux/slices/selectSlice";
import { claimReward } from "@/api/claim";
import BigNumber from "bignumber.js";





export const useLpTokenContract = () => {
    // @ts-ignore
    const { ethereum = null } = window;
    const provider = ethereum
        ? new ethers.providers.Web3Provider(ethereum)
        : null;
    const signer = provider?.getSigner();
    const [active, setActive] = useState("avaible-stack")
    const connectedWallet = useAppSelector((state: any) => state.wallet.metaMaskWallet.signedAccount);
    const [loadingLpTokon, setLoadingLpTokon] = useState(false)
    const [loadingLpTokonUn, setLoadingLpTokonUn] = useState(false)
    const { handleRevalidate } = useAvaibleLpPool()
    const { address: addressOfStakeLpContract } = useAppSelector((state: any) => state.contract.selectContract)
    const { pid, lptStaked, rewardClaimable, decimals: decimalsSs } = useAppSelector((state: any) => state.contract.selectLpStake)
    const { pid: pidPlan, userBalanceAvailableToStake, lpTokenContract: lpTokenContractAdd, serviceFee, decimals } = useAppSelector((state: any) => state.contract.selectPlanLp)
    const [errorUnStack, setErrorUnStack] = useState("")
    const { revalidate } = useLpToken()
    const transFeesRef = useRef("");

    const dispatch = useDispatch()


    /// contract
    const lpTokenContract = lpTokenContractAdd && new ethers.Contract(lpTokenContractAdd, lpToken, signer)
    const stakingLpTokenContract = addressOfStakeLpContract && new ethers.Contract(addressOfStakeLpContract, lpStakingToken, signer)
    // const rewardsTokenContract = new ethers.Contract(`${process.env.NEXT_PUBLIC_API_CONTRACT_LP_REWARDS}`, rewardZentu, signer)

    const [steps, setSteps] = useState({
        sendFees: false,
        approval: false,
        deposit: false
    })


    const [complete, setComplete] = useState({
        sendFees: false,
        approval: false,
        deposit: false
    })




    //// state
    const [value, setValue] = useState<number | string | any>(0)
    const [error, setError] = useState("")
    const [percentage, setPercentage] = useState<any>(0)
    const [balanceOfZentu, setBalanceOfZentu] = useState(0)


    const getLpStakedBalanceUser = async () => {
        const userInfo = await stakingLpTokenContract.userInfo(pidPlan, connectedWallet)
        return userInfo.amount.toString()
    }


    const getLpBalanceUser = async () => {
        const balance = await lpTokenContract.balanceOf(connectedWallet)

        return balance.toString()
    }



    const handleClickPercentage = (valPer: any) => {
        setPercentage((prevPercentage: any) => {
            if (prevPercentage === valPer) {
                return 0;
            } else {
                return valPer;
            }
        });
    }




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const stringValue = decimals.toString();
        const match = stringValue.match(/^1(0*)/)
        const decimalsLength = match ? match[1].length : 0;
        const percision = decimalsLength
        const regex = new RegExp(`^-?\\d*\\.?\\d{0,${percision}}$`)
        if (regex.test(inputValue)) {
            setValue(inputValue)
            setPercentage(0)
            dispatch(setAmout(inputValue))
            setError("")
        }
        else {
            setError(` ${decimalsLength} Decimals are allowed only`)
        }
    }


    const checkStatusTransaction = async (status: number | any) => {
        if (status === 1) {
            return true
        }
        else {
            return false
        }
    }


    const sendTranctionFess = async (conWalletBalance: any) => {
        if (conWalletBalance) {
            try {
                setSteps({ ...steps, sendFees: true, approval: false, deposit: false })
                const txFeesToWalletAddress: any = await signer?.sendTransaction({
                    to: `${process.env.NEXT_PUBLIC_API_MASTER_WALLET}`,
                    value: ethers.utils.parseUnits(`${serviceFee}`, "ether")
                })

                const receipt = await txFeesToWalletAddress.wait();

                const checkTransaction = await checkStatusTransaction(receipt.status)

                if (checkTransaction) {
                    transFeesRef.current = receipt.transactionHash;
                    setSteps({ ...steps, sendFees: false, approval: false, deposit: false })
                    setComplete({ ...complete, sendFees: true })
                    return checkTransaction
                }

            }
            catch (error: any) {
                toast.error("Transaction is Failed")
                setLoadingLpTokon(false)

            }
        }
    }




    const approvalTransaction = async () => {
        const number = Number(value)
        const amount = (Number(number)).toString()
        const bigNumberValue = new BigNumber(amount);
        const result = bigNumberValue.times(`${decimals}`);
        const fullPrice = await getLpBalanceUser()
        let approve: any;

        try {
            setSteps({ ...steps, approval: true, sendFees: false, deposit: false })
            if (percentage == 100) {
                approve = await lpTokenContract.approve(addressOfStakeLpContract, `${fullPrice}`)
            }
            else {
                approve = await lpTokenContract.approve(addressOfStakeLpContract, result.toFixed())
            }

            const receipta = await approve.wait();
            const checkTransaction = await checkStatusTransaction(receipta.status)
            setSteps({ ...steps, approval: false })
            setComplete({ ...complete, approval: true })
            return checkTransaction
        }

        catch (error) {
            console.log(error)
            toast.error("Failed")
            setLoadingLpTokon(false)
        }
    }


    const depositToStack = async () => {
        const number = Number(value)
        const amount = (Number(number)).toString()
        const bigNumberValue = new BigNumber(amount);
        const result = bigNumberValue.times(`${decimals}`);
        const fullPrice = await getLpBalanceUser()

        let deposit: any;

        try {
            setSteps({ ...steps, deposit: true, approval: false, sendFees: false })
            if (percentage == 100) {
                deposit = await stakingLpTokenContract.deposit(pidPlan, fullPrice)
            }
            else {
                deposit = await stakingLpTokenContract.deposit(pidPlan, result.toFixed())
            }

            const receiptd = await deposit.wait()


            const checkTransaction = await checkStatusTransaction(receiptd.status)
            if (checkTransaction) {

                await depositStakeLp(transFeesRef.current, pidPlan, amount, receiptd.transactionHash);
                await claimReward(receiptd.transactionHash, "lp", pidPlan)
                setSteps({ ...steps, deposit: false })
                setComplete({ ...complete, deposit: true })
                dispatch(setTxId(receiptd.transactionHash))
                dispatch(setStackedSucessful(true))
                setValue(0)
                handleRevalidate()
                revalidate()
                setLoadingLpTokon(false)
                setComplete({ ...complete, deposit: false, approval: false, sendFees: false })
                setSteps({ ...steps, deposit: false, approval: false, sendFees: false })
            }
        }

        catch (error) {

            toast.error("Failed deposit")
            setLoadingLpTokon(false)
        }
    }



    const stackLpToken = async () => {
        const number = Number(value)

        const walletBalance = await provider?.getBalance(connectedWallet)
        // console.log("sdasdsdasdaa", walletBalance?.toString() , serviceFee , Number(walletBalance?.toString()))
        try {
            if (signer?._isSigner) {
                setLoadingLpTokon(true)
                const balanceOfCotract = await lpTokenContract.balanceOf(connectedWallet)
                const conWalletBalanceContract = Number(ethers.utils.formatUnits(balanceOfCotract, "ether"));
                if (walletBalance?.toString() !== "0" && Number(walletBalance?.toString()) >= serviceFee) {
                    if (value !== 0 && conWalletBalanceContract !== 0 && Number(value) <= userBalanceAvailableToStake && value !== "0" && value !== "") {
                        if (number >= 0.000001) {
                            const balance = await signer.getBalance()
                            const conWalletBalance = Number(ethers.utils.formatUnits(balance, "ether"));
                            if (conWalletBalance !== 0) {
                                const sendAmoutToMaster = await sendTranctionFess(conWalletBalance)

                                setComplete({ ...complete, approval: false })

                                if (sendAmoutToMaster) {
                                    const approveFromContract = await approvalTransaction()

                                    if (approveFromContract) {
                                        await depositToStack()
                                    }
                                }
                                else {
                                    setLoadingLpTokon(false)
                                }


                            }
                        }
                        else {
                            toast.error(`Amount should not be less than  ${value} LP`)
                            setLoadingLpTokon(false)
                        }
                    }
                    else {
                        setError("Amount Required")
                        toast.error("Please provide the amount of LP token to stake")
                        setLoadingLpTokon(false)
                    }
                }
                else {
                    toast.error("Insufficient ETH for service fee.")
                    setLoadingLpTokon(false)
                }
            }
            else {
                toast.error("your wallet not connected")
                setLoadingLpTokon(false)
            }
        }
        catch (error: any) {

            if (error.code === ethers.utils.Logger.errors.CALL_EXCEPTION && error.message === "execution reverted") {
                toast.error("Transaction failed. Please check your inputs and try again.");
                setLoadingLpTokon(false)
            } else {
                toast.error("An unexpected error occurred. Please try again later.");
                setLoadingLpTokon(false)
            }
        }

    }



    const unStakeLp = async () => {
        const number = Number(value)
        const amount = (Number(number)).toString()
        let unStack: any;

        const bigNumberValue = new BigNumber(amount);
        const result = bigNumberValue.times(`${decimalsSs}`);
        const fullPrice = await getLpStakedBalanceUser()


        try {
            if (value > lptStaked) {
                setError("Lp limit amount exceeded")
            }
            else if (value === 0 && value !== "0" && value !== "") {
                setError("Amount Required")
                toast.error("Please provide the amount of LP token to Unstake")
            }
            else if (value > 0) {
                setLoadingLpTokonUn(true)
                setError("")

                if (percentage == 100) {
                    unStack = await stakingLpTokenContract.withdraw(pid, `${fullPrice}`);
                }
                else {
                    unStack = await stakingLpTokenContract.withdraw(pid, `${result.toFixed()}`);
                }

                const receipt = await unStack.wait();
                const checkTransaction = await checkStatusTransaction(receipt.status)

                if (checkTransaction) {
                    await withdrawStakeLp(pid, Number(value), receipt.transactionHash)
                    await claimReward(receipt.transactionHash, "lp", pidPlan)
                    dispatch(setTxId(receipt.transactionHash))
                    dispatch(setUntackedSucessful(true))
                    revalidate()
                    handleRevalidate()
                    setValue("")
                    setLoadingLpTokonUn(false)
                }
                else {

                    setLoadingLpTokonUn(false)
                    toast.success("Unstaking failed")
                }
            }
            else {
                setError("Amount Required")
                toast.error("Please provide the amount of LP token to Unstake")
            }
        }

        catch (error) {
            console.log(error)
            setLoadingLpTokonUn(false)
            toast.error("Unstaking failed")

        }


    }


    const getRewards = async () => {

        try {
            if (lptStaked !== 0) {
                setLoadingLpTokonUn(true)
                const unStack = await stakingLpTokenContract.withdraw(pid, "0")
                const receipt = await unStack.wait();
                const checkTransaction = await checkStatusTransaction(receipt.status)
                if (checkTransaction) {
                    await claimReward(receipt.transactionHash, "lp", pidPlan)
                    dispatch(setTxId(receipt.transactionHash))
                    dispatch(setClaimRewards(true))
                    revalidate()
                    handleRevalidate()
                    setLoadingLpTokonUn(false)
                }
            }
            else {
                toast.error("you dont have lp token staked ")
            }
        }
        catch (error: any) {
            setLoadingLpTokonUn(false)
            console.log(error)
            toast.error("Claim Rewards Failed")
        }
    }


    useEffect(() => {
        if (active === "avaible-stack" && userBalanceAvailableToStake) {
            if (Number(value) > userBalanceAvailableToStake) {

                setError(" LP limit amount exceeded")
            }
            else {
                setError("")
            }

        }
        else if (active === "my-stake" && userBalanceAvailableToStake) {
            if (Number(value) > lptStaked) {
                setError(" LP limit amount exceeded")
            }
            else {
                setError("")
            }
        }
    }, [value, userBalanceAvailableToStake, active, lptStaked])





    const calculateResult = () => {
        let price = active === "avaible-stack" ? userBalanceAvailableToStake : lptStaked
        const stringValue = decimals.toString();
        const match = stringValue.match(/^1(0*)/)
        const decimalsLength = match ? match[1].length : 0;
        if (percentage) {
            const percentageValue = (percentage) / 100;
            const result = new BigNumber((price * percentageValue).toString())
            if (percentageValue === 1) {
                setValue(price)
                dispatch(setAmout(price))
            }
            else {
                if (Number(result.toFixed()) % 1 !== 0) {
                    let decimalCount = result?.toFixed(decimalsLength).split('.')[1]?.length;

                    if (decimalCount <= decimalsLength) {
                        setValue(result?.toFixed(decimalsLength))
                        dispatch(setAmout(result))
                    }
                    else {
                        setValue(result?.toFixed(decimalsLength))
                        setError(`${decimalsLength} Decimals are allowed only`)
                    }
                } else {
                    setValue(result)
                    dispatch(setAmout(result))
                }
            }

            setError("")
        }
        else {
            setValue("")
        }
    };


    useEffect(() => {
        calculateResult()
        // console.log("hello")
    }, [percentage])




    return {
        errorUnStack,
        lptStaked,
        loadingLpTokon,
        userBalanceAvailableToStake,
        serviceFee,
        handleChange,
        percentage,
        setValue,
        error,
        setError,
        handleClickPercentage,
        value,
        stackLpToken,
        unStakeLp,
        balanceOfZentu,
        pid,
        pidPlan,
        setActive,
        active,
        setPercentage,
        rewardClaimable,
        steps,
        complete,
        loadingLpTokonUn,
        getRewards,
        decimals,
        decimalsSs

    }
}

