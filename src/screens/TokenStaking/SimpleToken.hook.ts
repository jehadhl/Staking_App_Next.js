import { useAppSelector } from "@/redux/hook"
import { ethers } from "ethers";
import { useState, useRef, useEffect } from "react"
import SimpleTokenAbi from "../../contracts/zentu_simple_token_api.json"
import SimpleTokenStakingAbi from "../../contracts/ABI_simpleStaking.json"
import toast from "react-hot-toast";
import { depositStakeSimpleToken, withdrawStakeSimpleToken } from "@/api/simplePool";
import { usePoolSimple } from "@/hooks/usePoolSimple";
import { usePlans } from "@/hooks/usePlans";
import { useDispatch } from "react-redux";
import { setAmout, setStackedSucessful, setTxId, setUntackedSucessful, setEmengercyWithdraw, setUnStakeZent, setClaimRewards } from "@/redux/slices/selectSlice";
import { claimReward } from "@/api/claim";
import BigNumber from "bignumber.js";






export const useSimpleToken = () => {
    // @ts-ignore
    const { ethereum = null } = window;
    const provider: any = ethereum
        ? new ethers.providers.Web3Provider(ethereum)
        : null;
    const signer = provider?.getSigner();


    const [active, setActive] = useState("avaible-stack")
    const { revalidate } = usePlans()

    const dispatch = useDispatch()
    const address: any = process.env.NEXT_PUBLIC_API_CONTRACT_SIMPLE_TOKEN
    const connectedWallet = useAppSelector((state: any) => state.wallet.metaMaskWallet.signedAccount);
    const { address: addressOfStakeSimpleContract } = useAppSelector((state: any) => state.contract.selectContract)
    const { userBalanceToStake, did, serviceFee, decimals, duration, index } = useAppSelector(state => state.contract.selectSimpleStake)
    const { transactionId, did: did2, totalStaked, unlockTime, rewardClaimable, isWithdrawUnlocked } = useAppSelector(state => state.contract.selectSimpleStakeById)
    console.log(address , "hello")
    const simpleTokenContract = new ethers.Contract(address?.toString(), SimpleTokenAbi, signer)
    const simpleTokenStakingContract = addressOfStakeSimpleContract && new ethers.Contract(addressOfStakeSimpleContract, SimpleTokenStakingAbi, signer)
    const { loadingPool, pooldata, error, handleRevalidate } = usePoolSimple(did)
    const [loadingC, setLoadingC] = useState(false)
    const [value, setValue] = useState<number | string | any>(0)
    const [errorB, setErrorB] = useState("")
    const [loadingSimple, setLoadingSimple] = useState(false)
    const [percentage, setPercentage] = useState<any>(0)
    const transFeesRef = useRef("");
    const [errorUnStack, setErrorUnStack] = useState("")
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


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const decimalsLength = decimals.toString().match(/^1(0*)/)?.[1].length || 0;
        const precision = decimalsLength;
        const regex = new RegExp(`^-?\\d*\\.?\\d{0,${precision}}$`);

        if (!/^[0-9.]*$/.test(inputValue)) {
            setErrorB("Only numeric values are allowed");
            return;
        }

        if (!regex.test(inputValue)) {
            setErrorB(`${decimalsLength} Decimals are allowed only`);
            return;
        }

        setValue(inputValue);
        setPercentage(0);
        dispatch(setAmout(inputValue));

        if (Number(inputValue) > userBalanceToStake) {
            setErrorB("The amount must not exceed your current balance.");
        } else {
            setErrorB("");
        }
    }

    const getUserBalanceSimpleToken = async () => {
        const balance = await simpleTokenContract.balanceOf(connectedWallet)
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
            setSteps({ ...steps, sendFees: true, approval: false, deposit: false })
            try {
                const txFeesToWalletAddress: any = await signer?.sendTransaction({
                    to: `${process.env.NEXT_PUBLIC_API_MASTER_WALLET}`,
                    value: ethers.utils.parseUnits(`${serviceFee}`, "ether")
                })

                const receipt = await txFeesToWalletAddress.wait();

                const checkTransaction = await checkStatusTransaction(receipt.status)

                if (checkTransaction) {
                    setSteps({ ...steps, sendFees: false, approval: false, deposit: false })
                    transFeesRef.current = receipt.transactionHash;
                    setComplete({ ...complete, sendFees: true })
                    return checkTransaction
                }

            }
            catch (error: any) {
                console.log(error)
                if (error.code === -32002) {
                    toast.error("Insufficient funds for gas")
                };
                toast.error("Transaction is Failed")
                setLoadingC(false)
            }
        }
    }



    const approvalTransaction = async () => {
        const number = Number(value)
        const amount = (Number(number)).toString()
        const bigNumberValue = new BigNumber(amount);
        const result = bigNumberValue.times(`${decimals}`);

        const fullPrice = await getUserBalanceSimpleToken()

        setSteps({ ...steps, approval: true, sendFees: false, deposit: false })

        let approve: any;
        let estimation;

        try {
            if (percentage == 100) {
                estimation = await simpleTokenContract?.estimateGas?.approve(
                    addressOfStakeSimpleContract, `${fullPrice}`
                );
                const overrides = { gasLimit: estimation.toString() };
                approve = await simpleTokenContract.approve(addressOfStakeSimpleContract, `${fullPrice}`, overrides)
            }
            else {
                estimation = await simpleTokenContract?.estimateGas?.approve(
                    addressOfStakeSimpleContract, result.toFixed()
                );
                const overrides2 = { gasLimit: estimation.toString() };
                approve = await simpleTokenContract.approve(addressOfStakeSimpleContract, result.toFixed(), overrides2)
            }

            const receipta = await approve.wait();
            const checkTransaction = await checkStatusTransaction(receipta.status)
            setSteps({ ...steps, approval: false })
            setComplete({ ...complete, approval: true })
            return checkTransaction
        }

        catch (error) {
            toast.error("Failed")

            setLoadingC(false)
        }
    }



    const depositToStack = async () => {
        const number = Number(value)
        const amount = (Number(number)).toString()
        const bigNumberValue = new BigNumber(amount);
        const result = bigNumberValue.times(`${decimals}`);

        const fullPrice = await getUserBalanceSimpleToken()

        let deposit: any;

        setSteps({ ...steps, deposit: true, approval: false, sendFees: false })


        try {
            if (percentage == 100) {
                deposit = await simpleTokenStakingContract.deposit(did, `${fullPrice}`)
            }
            else {
                deposit = await simpleTokenStakingContract.deposit(did, result.toFixed())
            }


            const receiptd = await deposit.wait();
            const checkTransaction = await checkStatusTransaction(receiptd.status)

            if (checkTransaction) {
                const stackCount = await simpleTokenStakingContract.stakeCount(did, connectedWallet)
                const result = Number(stackCount) - 1
                await depositStakeSimpleToken(transFeesRef.current, did, value, receiptd.transactionHash, result);
                await claimReward(receiptd.transactionHash, "token", did)
                dispatch(setTxId(receiptd.transactionHash))
                dispatch(setStackedSucessful(true))
                revalidate()
                setValue(0)
                handleRevalidate()
                setLoadingC(false)
                setComplete({ ...complete, deposit: false, approval: false, sendFees: false })
                setSteps({ ...steps, deposit: false, approval: false, sendFees: false })
            }
        }

        catch (error) {
            console.log(error)
            toast.error("Failed deposit")
            setLoadingC(false)
        }
    }






    const stackSimpleToken = async () => {

        const signer = provider?.getSigner();
        const walletBalance = await provider?.getBalance(signer.getAddress())
        console.log(signer?._isSigner , walletBalance)
        try {
            if (signer?._isSigner) {
                const balanceOfCotract = await simpleTokenContract.balanceOf(connectedWallet)
                const conWalletBalanceContract = Number(ethers.utils.formatUnits(balanceOfCotract, "ether"));
                console.log(conWalletBalanceContract ,balanceOfCotract  , connectedWallet)
                // const checkUserTx = await simpleTokenStakingContract.userTxStakedCount(connectedWallet, did)
                if (pooldata?.data?.isStakeAllowed) {
                    if (walletBalance?.toString() !== "0" && Number(walletBalance?.toString()) >= serviceFee) {
                        if (walletBalance.toString() !== "0" && value !== 0 && conWalletBalanceContract !== 0 && value !== "0" && value !== "" && Number(value) <= Number(userBalanceToStake)) {
                            if (Number(value) >= 10) {
                                setLoadingC(true)
                                const sendAmoutToMaster = await sendTranctionFess(conWalletBalanceContract)

                                if (sendAmoutToMaster) {
                                    const approveFromContract = await approvalTransaction()

                                    if (approveFromContract) {
                                        await depositToStack()
                                    }
                                }
                            }
                            else {
                                setErrorB("The minimum stake amount is 10 ZENT")
                            }

                        }
                        else {
                            setLoadingC(false)
                            setErrorB("Amount Required")
                            toast.error("Enter the desired staking amount of ZENT in the field provided")
                        }

                    }

                    else {
                        toast.error("Insufficient ETH for service fee.")
                        setLoadingC(false)
                    }
                }

                else {
                    toast.error(`you cant stake more than ${pooldata?.data?.stakedTxLimit}`);
                }
            }

            else {
                toast.error("your wallet not connected")
                setLoadingC(false)
            }
        }
        catch (error: any) {
               console.log(error)
            if (error.code === ethers.utils.Logger.errors.CALL_EXCEPTION && error.message === "execution reverted") {
                toast.error("Transaction failed. Please check your inputs and try again.");
            } else {
                toast.error("An unexpected error occurred. Please try again later.");
            }
            setLoadingC(false)
        }
    }


    const emergencyWithdraw = async () => {
        setLoadingSimple(true);
        try {
            const transaction = await simpleTokenStakingContract.emergencyWithdrawById(did2, transactionId);
            const receipt = await transaction.wait();
            const checkTransaction = await checkStatusTransaction(receipt.status);
            const amount = totalStaked;
            if (checkTransaction) {
                await withdrawStakeSimpleToken(did2, amount, receipt.transactionHash, transactionId);
                await claimReward(receipt.transactionHash, "token", did);
                setValue('');
                dispatch(setTxId(receipt.transactionHash));
                dispatch(setUntackedSucessful(true));
                dispatch(setEmengercyWithdraw(false))
                revalidate()
                handleRevalidate()
                setLoadingSimple(false);
            }
        }
        catch (error) {
            console.log(error)
            setLoadingSimple(false);

        }
    }


    const unStackSimpleToken = async () => {
        try {
            setErrorUnStack("");
            setLoadingSimple(true);
            const transaction = await simpleTokenStakingContract.withdraw(did2, transactionId);
            const receipt = await transaction.wait();
           
            const checkTransaction = await checkStatusTransaction(receipt.status);
            const amount = totalStaked + rewardClaimable;
           
            if (checkTransaction) {
                await withdrawStakeSimpleToken(did2, amount, receipt.transactionHash, transactionId);
                await claimReward(receipt.transactionHash, "token", did);
                setValue('');
                dispatch(setTxId(receipt.transactionHash));
                dispatch(setUntackedSucessful(true));
                revalidate();
                dispatch(setUnStakeZent(false))
                handleRevalidate();
                setLoadingSimple(false);
            } else {
                toast.error("Unstacking failed");
            }


        } catch (error) {
            console.log(error)
            setLoadingSimple(false);
            toast.error(totalStaked === 0 ? "You have already claimed the rewards from your stake" : "Unstacking failed");
        }
    };



    const calculateResult = () => {
        let price = userBalanceToStake
        const stringValue = decimals.toString();
        const match = stringValue.match(/^1(0*)/)
        const decimalsLength = match ? match[1].length : 0;

        if (percentage) {
            const percentageValue = (percentage) / 100;
            const result = new BigNumber((price * percentageValue).toString())
            if (Number(result.toFixed()) % 1 !== 0) {
                let decimalCount = result?.toFixed(decimalsLength).split('.')[1]?.length;

                if (decimalCount <= decimalsLength) {
                    setValue(result?.toFixed(decimalsLength))
                    dispatch(setAmout(result))
                }
                else {
                    setValue(result?.toFixed(decimalsLength))
                    setErrorB(`${decimalsLength} Decimals are allowed only`)
                }
            } else {
                setValue(result)
                dispatch(setAmout(result))
            }
            setErrorB("")
        }
        else {
            setValue("")
        }
    };


    // console.log(totalStaked , Number(pooldata?.data?.zentuAvailableReward))

    const getRewards = async () => {
        setLoadingSimple(true);
        try {
            if (Number(pooldata?.data?.zentuAvailableReward) !== 0) {
                const takeRewards = await simpleTokenStakingContract.completeWithdraw(did);
                const receipt = await takeRewards.wait();
                const checkTransaction = await checkStatusTransaction(receipt.status)
                if (checkTransaction) {
                    await claimReward(receipt.transactionHash, "token", did)
                    dispatch(setClaimRewards(true))
                    dispatch(setTxId(receipt.transactionHash))
                    revalidate()
                    handleRevalidate() 
                 }
            }
            else {
                toast.error("you dont have zent token staked ")
                setLoadingSimple(false)
            }
        }
        catch (error: any) {
            setLoadingSimple(false)
            console.log(error)
            toast.error("Claim Rewards Failed")
        }
    }


    useEffect(() => {
        calculateResult()
    }, [percentage])


    return {
        value,
        handleChange,
        handleClickPercentage,
        errorB,
        setErrorB,
        percentage,
        setValue,
        stackSimpleToken,
        unStackSimpleToken,
        loadingC,
        errorUnStack,
        userBalanceToStake,
        did,
        active, setActive,
        totalStaked,
        rewardClaimable,
        unlockTime,
        index,
        setPercentage,
        steps,
        loadingSimple,
        complete,
        decimals,
        getRewards,
        emergencyWithdraw,
        loadingPool,
        pooldata,
        error,
        duration
    }

}