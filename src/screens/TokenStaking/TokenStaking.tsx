"use client"
import ClaimRewardsHeader from '@/components/ClaimRewardsHeader/ClaimRewardsHeader'
import React, { useCallback, useEffect, useState } from 'react'
import styles from "./TokenStaking.module.scss"
import StakingDetailsSimple from '@/components/StakingDetails/StakingDetails'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { setEmengercyWithdraw, setSelectSimpleStack, setSlectSimpleStakeById, setStackedSucessful, setUntackedSucessful, setUnStakeZent, setClaimRewards } from '@/redux/slices/selectSlice'
import { useSimpleToken } from './SimpleToken.hook'
import TokenMyStakingTable from '../../components/TokenMyStakingTable/TokenMyStakingTable'
import ButtonConnectWallet from '@/components/ButtonConnectWallet/ButtonConnectWallet'
import { usePlans } from '@/hooks/usePlans'
import ImageS from "../../../public/images/sucess.png"
import { IoIosArrowDown, IoMdArrowBack, IoMdArrowForward } from 'react-icons/io'
import CustomModal from '@/components/CustomModal/CustomModal'
import Image from 'next/image'
import NextLink from 'next/link'
import ImageA from "../../../public/images/activeIcon.png"
import ImageH from "../../../public/images/Vectorsd.svg"
import ImageW from "../../../public/images/warning.png"
import toast from 'react-hot-toast'
import useHistory from '@/hooks/useHistory'
import HistoryLp from '@/components/HistoryLp/HistoryLp'
import { ethers } from 'ethers'
import TokenAvaibleStakingTable from '@/components/TokenAvaibleStakingTable/TokenAvaibleStakingTable'





const TokenStaking = () => {
    const dispatch = useAppDispatch()
    const { data, loading } = usePlans()
    const { stackedSucessful, txId, value: amount, stackedUnSucessful, emergencyWithdraw: emergencyWithdrawPopUp, unStakeZent, selectSimpleStakeById, claimRewards, selectSimpleStake } = useAppSelector((state) => state.contract)

    const { value, handleChange, handleClickPercentage, percentage, errorB, unlockTime, setValue, setPercentage, getRewards, emergencyWithdraw, totalStaked, stackSimpleToken, loadingC, unStackSimpleToken,
        index, did, errorUnStack, active, setActive, steps, complete, loadingSimple, loadingPool,
        pooldata, duration,
        error } = useSimpleToken()

    const { serviceFee } = useAppSelector(state => state.contract.selectSimpleStake)


    const handleClick = (value: string) => {
        setActive(value)
        setValue(0)
        setPercentage(0)
    }

    const handleClose = () => {
        dispatch(setStackedSucessful(false))
        dispatch(setUntackedSucessful(false))
        dispatch(setEmengercyWithdraw(false))
        dispatch(setUnStakeZent(false))
        dispatch(setClaimRewards(false))
    }

    const handleCopy = () => {
        if (txId) {
            navigator.clipboard.writeText(txId)
                .then(() => {
                    toast.success("Copied")
                })
                .catch((error) => {
                    toast.error("Failed to copy")
                });
        }
    };

    const [itemsPerPageHistroy, setItemsPerPageHistory] = useState<number>(4);
    const [currentPageHistory, setCurrentPageHistory] = useState<number>(1);

    const { loadingHistory, history, errorHistory } = useHistory(currentPageHistory, itemsPerPageHistroy, active, "token")
   

    const handlePageChangeHistroey = (e: any, page: any) => {
        const totalPages = Math.ceil((history?.data.totalCount / itemsPerPageHistroy));
        if (page === "inc" && currentPageHistory < totalPages) {
            setCurrentPageHistory(currentPageHistory + 1);
        } else if (page === "dec" && currentPageHistory > 1) {
            setCurrentPageHistory(currentPageHistory - 1);
        }
    };

    const handleClickUnstake = () => {
        dispatch(setUnStakeZent(true))
    }


    const [openDropDown, setOpenDropDown] = useState(false)
    const handleDropDown = () => {
        setOpenDropDown(!openDropDown)
    }

    useEffect(() => {
        if (!!pooldata) {
            const initialData = pooldata?.data?.poolInfo[0];
            if (initialData) {
                dispatch(setSlectSimpleStakeById(initialData));
                if (active === "my-stake") {
                    setValue(initialData?.totalStaked)
                }
            }
        }
    }, [pooldata, active]);


    const showEmengercy = () => {
        dispatch(setEmengercyWithdraw(true))
        dispatch(setUnStakeZent(false))
    }



    const handleSelectSimpleTokenData = useCallback((item: any) => {
        dispatch(setSlectSimpleStakeById(item));
        setValue(item?.totalStaked)
    }, [dispatch, value]);

    const openUnStakePopUp = () => {
        dispatch(setUnStakeZent(true))
    }

    useEffect(() => {
        if (data?.data?.length > 0) {
            dispatch(setSelectSimpleStack(data.data[0]));
        }
    }, [data, index, dispatch]);


   console.log(index)

    // useEffect(() => {
    //     if (unStakeZent || emergencyWithdrawPopUp) {
    //         document.body.classList.add('hide-scroll');
    //     } else {
    //         document.body.classList.remove('hide-scroll');
    //     }
    //     return () => {
    //         document.body.classList.remove('hide-scroll');
    //     };
    // }, [unStakeZent, emergencyWithdrawPopUp]);

   

    return (
        <>

            <section className={styles.TokenStaking}>
                <div className={styles.showBtn}>
                    <ButtonConnectWallet />
                </div>
                <div className={styles.TokenStaking_headers}>
                    <ClaimRewardsHeader nameToken={"ZENT"}
                        getRewards={getRewards}
                        rewards={Number(pooldata?.data?.zentuAvailableReward)}
                        type={"simple-token"}
                        text={"Earn rewards from your chosen Token Staking plan once the locking period concludes."} />
                </div>

                <div className={styles.stakingDetailsCard}>
                    <div className={styles.gridSection}>
                        <div className={styles.secOne}>
                            <StakingDetailsSimple
                                handleChange={handleChange}
                                value={value}
                                staked={pooldata?.data?.zentuTotalStake}
                                handleClickPercentage={handleClickPercentage}
                                percentage={percentage}
                                serviceFee={serviceFee}
                                userBalanceAvailableToStake={selectSimpleStake?.userBalanceToStake}
                                error={errorB}
                                stackToken={stackSimpleToken}
                                loading={loadingC}
                                rewards={pooldata?.data?.totalClaimed}
                                unStackToken={selectSimpleStakeById.isWithdrawUnlocked ? unStackSimpleToken : showEmengercy}
                                nameToken={"ZENT"}
                                loadingaVaible={loading}
                                errorStack={errorUnStack}
                                unlockTime={unlockTime}
                                loadingPool={loadingPool}
                                active={active}
                                steps={steps}
                                complete={complete}
                                loadingSimple={loadingSimple}
                                dataLength={pooldata?.data?.poolInfo?.length}
                                totalStaked={totalStaked}
                                duration={duration}
                            />
                        </div>

                        <div className={styles.secTwo}>

                            <div className={styles.selectPool}>
                                <div className='flex items-center gap-2'>
                                    <div
                                        className={`${styles.box} ${active === "avaible-stack" && styles.activeBox}`}
                                        onClick={() => handleClick("avaible-stack")}
                                    >
                                        <h1 className={styles.box_title}>Available Staking</h1>
                                    </div>
                                    <div
                                        className={`${styles.box} ${active === "my-stake" && styles.activeBox}`}
                                        onClick={() => handleClick("my-stake")}
                                    >
                                        <h1 className={styles.box_title}>My Stake</h1>
                                    </div>

                                </div>
                                {
                                    active === "history" ? (
                                        <button onClick={() => handleClick("history")}><Image src={ImageA} width={25} height={40} alt='iamge)' /></button>
                                    ) : (
                                        <button onClick={() => handleClick("history")}><Image src={ImageH} width={25} height={40} alt='iamge)' /></button>
                                    )
                                }
                            </div>
                            {
                                active === "my-stake" ? (<h1 className='text-white text-sm my-4'>Track all your ongoing and completed staking transactions here.</h1>) : active === "history" ?
                                    (<h1 className='text-white text-sm my-4'>View all your transaction details here </h1>) : null
                            }


                            <div className={styles.showinfo}>

                                {active === "avaible-stack" ? (

                                    <>
                                        <TokenAvaibleStakingTable
                                            loadingPlan={loading}
                                            plan={data}

                                        />
                                    </>
                                ) : active === "my-stake" ? (

                                    <div className={styles.mainOfShow}>
                                        <TokenMyStakingTable
                                            loading={loadingPool}
                                            error={error}
                                            data={pooldata}
                                            // checkBlock={checkBlock}
                                            handleSelectSimpleTokenData={handleSelectSimpleTokenData}
                                            selectedSimpleToken={selectSimpleStakeById}
                                            unStackToken={unStackSimpleToken}

                                        />
                                    </div>
                                ) : active === "history" ? (
                                    <>
                                        <div className={styles.mainOfShow}>
                                            <HistoryLp loadingHistory={loadingHistory} history={history} errorHistory={errorHistory} current />

                                        </div>
                                        {history?.data?.totalCount > 0 && (
                                            <div className={styles.footerOfTable} >
                                                <button
                                                    className={`${styles.iconWrapper} ${currentPageHistory === 1 ? styles.opacity : ""}`}
                                                    disabled={currentPageHistory === 1}
                                                    onClick={(e) => handlePageChangeHistroey(e, "dec")}
                                                >

                                                    <IoMdArrowBack className={styles.icon} />
                                                </button>


                                                <h1 className='text-white text-sm'>Page {currentPageHistory} of {Math.ceil((history?.data.totalCount / itemsPerPageHistroy))}</h1>

                                                <button

                                                    className={`${styles.iconWrapper} ${currentPageHistory === history?.data.totalCount ? styles.opacity : ""}`}
                                                    onClick={(e) => handlePageChangeHistroey(e, "inc")}
                                                >

                                                    <IoMdArrowForward className={styles.icon} />
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : null}

                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


            <CustomModal
                open={emergencyWithdrawPopUp}
                close={() => handleClose()}
                width="520px"
                zindex={2000}
            >
                <div className="flex flex-col gap-2 md:gap-3 w-full items-center py-2 md:py-2  ">
                    <Image src={ImageW} alt="img_metaMask" quality={100} />


                    <p className="text-white text-center w-full text-base md:text-lg font-[500] px-2 ">
                        Are you sure you want to unstake and forfeit your rewards?
                    </p>



                    <div className='flex w-full gap-2'>
                        <button className={styles.roundedFullg} onClick={emergencyWithdraw}>
                            Yes
                        </button>
                        <button className={styles.cancel} onClick={() => handleClose()}>
                            No
                        </button>
                    </div>

                    <p className='text-white text-sm'>Note :<span className={styles.textSpan}> Unstaking within the locking period will result in forfeiting your rewards.</span></p>
                </div>


            </CustomModal>


            {/* <CustomModal
                open={unStakeZent}
                close={() => handleClose()}
                width="500px"
                type="unStake"
                zindex={1000}
            >
                <div className={styles.line} />
                <div className={styles.option}>
                    <div className={styles.option_select}>
                        <div className={styles.indexs}>

                            0{index + 1}
                        </div>
                        <div className={styles.headIcon} onClick={handleDropDown}>

                            <div>{(selectSimpleStakeById && selectSimpleStakeById?.isWithdrawUnlocked) ? <div className={styles.completed}>Completed</div> : <div className={styles.onGoing}> Ongoing </div>} </div>


                            <div> <IoIosArrowDown color='white' /> </div>
                        </div>

                    </div>


                </div>
                {!openDropDown && (
                    <div className={styles.allInfo}>
                        {
                            pooldata?.data?.poolInfo &&
                            <div className={`${styles.main}  ${pooldata?.data?.poolInfo.length > 5 ? styles.overflowShow : ""}`}>
                                {
                                    pooldata?.data?.poolInfo?.map((item: any, index: number) => {

                                        return (
                                            <div key={index} onClick={() => handleSelectSimpleTokenData(item)} className={`${styles.flexContent} 
                                            
                                            ${item.transactionId === selectSimpleStakeById.transactionId ? styles.bgGround : ""}
                                            ${index === 0 ? styles.noBorder : styles.haveBorder}
                                            `

                                            }>
                                                <div className={styles.table}>
                                                    <div className={styles.box}>
                                                        <div className={styles.headTitleId}>
                                                            {index <= 9 ? "0" : ""}{index + 1}
                                                        </div>
                                                        <div />
                                                    </div>
                                                    <div className={styles.box}>
                                                        <div className={styles.headTitle}>
                                                            Duration
                                                        </div>
                                                        <p className={styles.p}>
                                                            {item.duration}
                                                        </p>

                                                    </div>

                                                    <div className={styles.box}>
                                                        <div className={styles.headTitle}>
                                                            Total Staked
                                                        </div>
                                                        <p className={styles.p}>
                                                            {item.totalStaked?.toFixed(4)}
                                                        </p>
                                                    </div>


                                                    <div className={styles.box}>
                                                        <div className={styles.headTitle}>
                                                            Rewards
                                                        </div>
                                                        <p className={styles.p}>
                                                            {item?.rewardClaimable?.toFixed(4)}
                                                        </p>
                                                    </div>

                                                </div>
                                                <div>
                                                    {(item.isWithdrawUnlocked) ? <div className={styles.completed}>Completed</div> : !item.isWithdrawUnlocked ? <div className={styles.onGoing}> Ongoing </div> : ""}

                                                </div>
                                            </div>

                                        )
                                    })

                                }
                            </div>
                        }
                    </div>
                )
                }
                <button className={styles.btn} onClick={selectSimpleStakeById.isWithdrawUnlocked ? unStackSimpleToken : showEmengercy}>Unstake</button>
            </CustomModal> */}


            <CustomModal
                open={stackedSucessful}
                close={() => handleClose()}
                width="420px"
                zindex={1000}
            >
                <div className="flex flex-col gap-2 md:gap-3 w-full items-center py-2 md:py-2 px-2 ">
                    <Image src={ImageS} alt="img_metaMask" />
                    <div className=" mt-0 pt-0">
                        <div className="text-white text-center w-full text-base md:text-lg font-[500]">
                            Congratulations!
                        </div>
                        <p className=" text-white ttext-base md:text-lg font-[500] text-center my-1">
                            You’ve successfully staked
                        </p>
                        <p className=" text-[#9CA4AB] text-sm md:text-base text-center ">
                            {(Number(amount))}  ZENT.
                        </p>

                    </div>
                    <div className={styles.input}>
                        <h2 className={styles.inputText} onClick={handleCopy}>
                            {txId?.length > 0 ? `${txId.slice(0, 14)}..........${txId.slice(-14)}` : txId}

                        </h2>

                        <h2 className={styles.inputText2} onClick={handleCopy}>
                            {txId?.length > 0 ? `${txId.slice(0, 8)}..........${txId.slice(-8)}` : txId}

                        </h2>
                    </div>
                    <div className='w-full mt-2'>
                        <NextLink href={`${process.env.NEXT_PUBLIC_URL_SEPOLIA}/${txId}`} className={styles.btn} target='_blank'>View in Explorer</NextLink>
                    </div>
                </div>
            </CustomModal>

            <CustomModal
                open={stackedUnSucessful}
                close={() => handleClose()}
                width="420px"
                zindex={1000}
            >
                <div className="flex flex-col gap-2 md:gap-3 w-full items-center py-2 md:py-2 px-2 ">
                    <Image src={ImageS} alt="img_metaMask" />
                    <div className="mt-0 pt-0">
                        <div className="text-white text-center w-full text-base md:text-lg font-[500]">
                            Congratulations!
                        </div>
                        <p className=" text-white ttext-base md:text-lg font-[500] text-center my-1">
                            You’ve successfully unstaked
                        </p>

                    </div>
                    <div className={styles.input}>
                        <h2 className={styles.inputText} onClick={handleCopy}>
                            {txId?.length > 0 ? `${txId.slice(0, 14)}..........${txId.slice(-14)}` : txId}

                        </h2>

                        <h2 className={styles.inputText2} onClick={handleCopy}>
                            {txId?.length > 0 ? `${txId.slice(0, 8)}..........${txId.slice(-8)}` : txId}

                        </h2>
                    </div>
                    <div className='w-full mt-2'>
                        <NextLink href={`${process.env.NEXT_PUBLIC_URL_SEPOLIA}/${txId}`} className={styles.btn} target='_blank'>View in Explorer</NextLink>
                    </div>
                </div>
            </CustomModal>


            <CustomModal
                open={claimRewards}
                close={() => handleClose()}
                width="450px"
                zindex={1000}
            >
                <div className="flex flex-col gap-2 md:gap-3 w-full items-center py-2 md:py-2 px-2 ">
                    <Image src={ImageS} alt="img_metaMask" />
                    <div className=" mt-0 pt-0">
                        <div className="text-white text-center w-full text-base md:text-lg font-[500]">
                            Congratulations!
                        </div>
                        <p className=" text-white ttext-base md:text-lg font-[500] text-center my-1">
                            You’ve successfully claimed your ZENT rewards
                        </p>
                    </div>
                    <div className={styles.input}>
                        <h2 className={styles.inputText} onClick={handleCopy}>
                            {txId?.length > 0 ? `${txId.slice(0, 14)}..........${txId.slice(-14)}` : txId}
                        </h2>
                        <h2 className={styles.inputText2} onClick={handleCopy}>
                            {txId?.length > 0 ? `${txId.slice(0, 8)}..........${txId.slice(-8)}` : txId}
                        </h2>
                    </div>
                    <div className='w-full mt-2'>
                        <NextLink href={`${process.env.NEXT_PUBLIC_URL_SEPOLIA}/${txId}`} className={styles.btn} target='_blank'>View in Explorer</NextLink>
                    </div>
                </div>
            </CustomModal>
        </>
    )
}

export default TokenStaking


// onClick={() => router.push(`https://etherscan.io/address/${refTx}`)}