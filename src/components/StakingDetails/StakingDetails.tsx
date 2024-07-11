import React, { useEffect, useState } from 'react'
import styles from "./StakingDetails.module.scss"
import Image from 'next/image'
import logoImage from "../../../public/images/logoImage.png"
import { percentageStake } from '@/utils/constants'
import ButtonPercentage from '../ButtonPercentage/ButtonPercentage'
import { IoMdCheckmark, IoMdInformationCircleOutline } from 'react-icons/io'
import { DotLoader, PuffLoader } from 'react-spinners'
import { format } from "date-fns";
import BigNumber from 'bignumber.js'

const StakingDetailsSimple = ({
    handleChange,
    value,
    handleClickPercentage,
    unStackToken,
    percentage,
    serviceFee,
    nameToken,
    staked,
    userBalanceAvailableToStake,
    error,
    errorStack,
    stackToken,
    rewards,
    unlockTime,
    loading,
    isLoading,
    loadingPool,
    loadingaVaible,
    active,
    rewardClaimable,
    isLoadingMyStack,
    dataLength,
    steps,
    complete,
    loadingLpTokonUn,
    loadingSimple,
    duration,
    totalStaked
}: any) => {

    let number: number = 0
    function floorPrecised(number: number, precision: number) {
        let power = Math.pow(10, precision);
        return Math.floor(number * power) / power;
    }

    const bigNumber = userBalanceAvailableToStake && new BigNumber(`${userBalanceAvailableToStake}`)
    const bigNumberStaked = staked ? new BigNumber(`${staked}`) : 0
    const [numberE, setNumberE] = useState(false)
    const [stakedE, setStakedE] = useState(false)
    const [hover, setHover] = useState(false)
    const [hoverS, setHoverS] = useState(false)
    const [hoverR, setHoverR] = useState(false)


    useEffect(() => {
        if (userBalanceAvailableToStake?.toString()?.includes('e')) {
            setNumberE(true)
        } else {
            setNumberE(false)
        }
    }, [userBalanceAvailableToStake])


    useEffect(() => {
        if (staked?.toString()?.includes('e')) {
            setStakedE(true)
        } else {
            setStakedE(false)
        }
    }, [staked])




    const bigNumberRewards: any = rewards ? new BigNumber(rewards.toString()) : 0





    return (
        <>
            <h1 className={styles.textHeader}>Staking Details</h1>
            <div className={styles.gridDev}>

                {
                    nameToken === 'LP' && (
                        <div className={styles.stakedAmout}>
                            <h1 className={styles.stakedAmout_text}>Available Amount</h1>
                            <h1 className={styles.stakedAmout_price} onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}>
                                {isLoading ? (
                                    <div className={styles.skeloading} />
                                ) : (
                                    (numberE ? bigNumber?.toFixed().length > 8 ? `${bigNumber?.toFixed().slice(0, 8)}....` : bigNumber?.toFixed() : floorPrecised(userBalanceAvailableToStake, 2))
                                )}
                                <span className={styles.spanText}> {nameToken} </span>
                            </h1>

                            {(hover && (userBalanceAvailableToStake || userBalanceAvailableToStake == 0)) ? (
                                <div className=' absolute top-[10px] border-Green border bg-Primary  text-white p-1 left-0 text-sm'>
                                    <h1>{bigNumber?.toFixed()}</h1>
                                </div>
                            ) : null}
                        </div>
                    )
                }


                {
                    nameToken === "ZENT" && (
                        <div className={styles.stakedAmout}>
                            <h1 className={styles.stakedAmout_text}>Available  Amount</h1>
                            <h1 className={styles.stakedAmout_price} onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}>
                                {loadingaVaible ? (
                                    <div className={styles.skeloading} />
                                ) : (
                                    (numberE ? bigNumber?.toFixed().length > 8 ? `${bigNumber?.toFixed().slice(0, 8)}....` : bigNumber?.toFixed() : floorPrecised(userBalanceAvailableToStake, 2))
                                )} <span className={styles.spanText}> {nameToken} </span></h1>


                            {(hover && (userBalanceAvailableToStake || userBalanceAvailableToStake == 0)) ? (
                                <div className=' absolute top-[10px] border-Green border bg-Primary  text-white p-1 left-0 text-sm'>
                                    <h1>{bigNumber?.toFixed()}</h1>
                                </div>
                            ) : null}
                        </div>
                    )
                }

                {
                    nameToken == 'LP' && (

                        <div className={styles.stakedAmout}>
                            <h1 className={styles.stakedAmout_text}>Staked Amount</h1>
                            <h1 className={styles.stakedAmout_price} onMouseEnter={() => setHoverS(true)}
                                onMouseLeave={() => setHoverS(false)}>
                                {isLoadingMyStack ? (
                                    <div className={styles.skeloading} />
                                ) : active === "avaible-stack" ? (
                                    stakedE ? bigNumberStaked?.toFixed() : floorPrecised(staked, 2)
                                ) : (
                                    stakedE ? bigNumberStaked?.toFixed() : floorPrecised(staked, 2)
                                )}
                                <span className={styles.spanText}> LP </span>
                            </h1>

                            {(hoverS && (staked || staked == 0)) ? (
                                <div className=' absolute top-[10px] border-Green border bg-Primary  text-white p-1 left-0 text-sm'>
                                    <h1>{bigNumberStaked?.toFixed()}</h1>
                                </div>
                            ) : null}
                        </div>

                    )
                }


                {
                    nameToken == 'ZENT' && (
                        <div className={styles.stakedAmout}>
                            <h1 className={styles.stakedAmout_text}>Staked Amount</h1>
                            <h1 className={styles.stakedAmout_price} onMouseEnter={() => setHoverS(true)}
                                onMouseLeave={() => setHoverS(false)}>  {loadingPool ? (
                                    <div className={styles.skeloading} />
                                ) : active === "avaible-stack" ? (
                                    stakedE ? bigNumberStaked?.toFixed() : staked ? floorPrecised(staked, 2) : 0
                                ) : (
                                    stakedE ? bigNumberStaked?.toFixed() : staked ? floorPrecised(staked, 2) : 0
                                )} <span className={styles.spanText}> {nameToken} </span></h1>


                            {(hoverS && (staked || staked == 0)) ? (
                                <div className=' absolute top-[10px] border-Green border bg-Primary  text-white p-1 left-0 text-sm'>
                                    <h1>{bigNumberStaked?.toFixed()}</h1>
                                </div>
                            ) : null}
                        </div>

                    )
                }





                {
                    nameToken === "ZENT" && (
                        <div className={styles.stakedAmout}>
                            <h1 className={styles.stakedAmout_text}>Claimed Rewards</h1>
                            <h1 className={styles.stakedAmout_price} onMouseEnter={() => setHoverR(true)} onMouseLeave={() => setHoverR(false)}>
                                {loadingPool ? (
                                    <div className={styles.skeloading} />
                                ) : active === "avaible-stack" ? (
                                    rewards == null || rewards === "" ?
                                        number :
                                        (bigNumberRewards.toFixed() !== "0" ? bigNumberRewards?.toFixed(2) : bigNumberRewards?.toFixed())
                                ) : (
                                    typeof rewards !== "string" ?
                                        (bigNumberRewards.toFixed() !== "0" ? bigNumberRewards?.toFixed(2) : bigNumberRewards?.toFixed()) :
                                        number
                                )}
                                <span className={styles.spanText}>{nameToken}</span>
                            </h1>

                            {hoverR ? (
                                <div className=' absolute top-[10px] border-Green border bg-Primary  text-white p-1 left-0 text-sm'>
                                    <h1>{bigNumberRewards?.toFixed()}</h1>
                                </div>
                            ) : null}
                        </div>
                    )
                }



                {
                    nameToken == 'LP' && (
                        <div className={styles.stakedAmout}>
                            <h1 className={styles.stakedAmout_text}>   Claimed Rewards</h1>
                            <h1 className={styles.stakedAmout_price} onMouseEnter={() => setHoverR(true)} onMouseLeave={() => setHoverR(false)}>
                                {isLoadingMyStack ? (
                                    <div className={styles.skeloading} />
                                ) : active === "avaible-stack" ? (
                                    rewardClaimable == null || rewardClaimable == "" ? number : rewardClaimable?.toFixed(2)
                                ) : (
                                    typeof rewardClaimable !== "string" ? rewardClaimable?.toFixed(2) : number
                                )}
                                <span className={styles.spanText}> ZENT </span>
                            </h1>


                            {hoverR ? (
                                <div className=' absolute top-[10px] border-Green border bg-Primary  text-white p-1 left-0 text-sm'>
                                    <h1>{rewardClaimable}</h1>
                                </div>
                            ) : null}
                        </div>

                    )
                }
            </div>

            <div className={styles.line} />


            <div className={styles.percentageCard}>
                <div className={styles.percentageCard_header}>
                    <div className={styles.ZentOne}>
                        <Image
                            src={logoImage}
                            alt='image_logo'
                            height={30}
                            width={30}
                            quality={100}
                        />
                        <h1 className={styles.titleOneZent}> {nameToken}</h1>
                    </div>

                    <div className='flex items-center gap-2 justify-end'>

                        <input className={styles.input} value={value ? value : ""} onChange={handleChange} placeholder='0' />
                    </div>
                </div>
                {
                    error ? (
                        <p className='text-red-500 w-full text-right flex items-center justify-end gap-1 S-280:text-xs S-600:text-sm S-1060:text-base'><IoMdInformationCircleOutline className='S-600:text-xl S-280:text-sm' />{error}</p>
                    ) : null
                }

                {
                    ((active === "my-stake" && nameToken == 'LP') || active === "avaible-stack") && (
                        <div className={styles.percentageCard_button}>
                            {
                                percentageStake.map((item, index) => {
                                    return (
                                        <ButtonPercentage
                                            label={item.label}
                                            value={item.value}
                                            key={item.id}
                                            handleClickPercentage={handleClickPercentage}
                                            percentage={percentage}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                }



                {
                    (active === "my-stake" || active === "history") && (
                        <div className={styles.showInfoo}>
                            <IoMdInformationCircleOutline className='S-600:text-2xl S-280:text-sm w-7 h-7' />
                            <h1 className={styles.text}>{nameToken === "LP" ? "When you unstake, you will receive all the available rewards." : "Unstaking forfeits rewards until the staking period ends; rewards are received once the current plan(s) are complete."}
                            </h1>
                        </div>
                    )
                }

                {/* <p className='text-yellowDark S-500:text-sm S-280:text-xs pl-2'>Note: You’re staking XXX% of your cumulative ZENT amount. </p> */}
            </div>



            {(active === "avaible-stack" && nameToken == 'LP') && (
                <div className={styles.fees}>
                    {
                        nameToken === "ZENT" ? (
                            <div className={styles.fees_info}>
                                <h2 className={styles.fees_info_text} >Locked till</h2>
                                <h2 className={styles.fees_info_value}>{loadingPool ? <div className={styles.skeloading} /> : unlockTime ? format(unlockTime, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')} </h2>
                            </div>
                        ) : (
                            <div className={styles.fees_info}>
                                <h2 className={styles.fees_info_text} >Lock period</h2>
                                <h2 className={styles.fees_info_value}>Flexible</h2>
                            </div>
                        )
                    }


                    <div className={styles.fees_info}>
                        <h2 className={styles.fees_info_text}>Service Fee <IoMdInformationCircleOutline className='text-xl' /></h2>
                        <h2 className={styles.fees_info_value}>{serviceFee} ETH</h2>
                    </div>
                </div>
            )}

            {
                nameToken === "ZENT" ? (
                    <div className={styles.fees}>
                        <div className={styles.fees_info}>
                            <h2 className={styles.fees_info_text} >Lock period</h2>
                            <h2 className={styles.fees_info_value}> {loadingPool ? <div className={styles.skeloading} /> : duration}</h2>
                        </div>
                        <div className={styles.fees_info}>
                            <h2 className={styles.fees_info_text}>Service Fee <IoMdInformationCircleOutline className='text-xl' /></h2>
                            <h2 className={styles.fees_info_value}>{serviceFee} ETH</h2>
                        </div>
                    </div>
                ) : null
            }



            {
                errorStack ? (
                    <div className='bg-red-200 rounded-lg text-red-500 my-4 p-3 font-semibold'>
                        {errorStack}
                    </div>
                ) : null
            }



            <div className={styles.flexButton}>

                <button disabled={active === "my-stake" || error !== "" || userBalanceAvailableToStake === 0 || active === "history"} className={`${styles.btnContainer} ${active === "my-stake" || active === "history" || error !== "" || userBalanceAvailableToStake === 0 ? styles.unactive : ""}`} onClick={stackToken} >
                    Stake
                </button>

                <button disabled={active === "avaible-stack" || error !== "" || dataLength === 0 || active === "history" || totalStaked === 0} className={`${styles.btnContainer} ${active === "avaible-stack" || totalStaked === 0 || active === "history" || error !== "" || dataLength === 0 ? styles.unactive : ""}`} onClick={unStackToken}>
                    Unstake
                </button>
            </div>

            {/* nameToken === "ZENT" ? handleClickUnstake : */}
            {loading ? (
                <div className="fixed  top-0 left-0 right-0 w-full h-full bg-black/10 backdrop-opacity-16  backdrop-blur-[0.5px] "></div>
            ) : null}

            <>
                <div
                    className={`${styles.modal} ${loading ? styles.modalshow : ""
                        }`}
                >
                    <div className={styles.modalBox}>
                        <div className="relative w-auto mx-auto my-6 bg-dark p-8 rounded-lg">
                            <div className={styles.content}>
                                <h1 className={styles.text_content}>{nameToken === "ZENT" ? "Staking ZENT Token " : "Staking LP"}</h1>
                                <p className={styles.p_content}>Follow the steps below to continue.</p>
                            </div>

                            <div className='space-y-6 '>
                                <div className={styles.loadingContent}>
                                    <div className='w-8 h-8'>
                                        {
                                            steps?.sendFees ? (
                                                <DotLoader color="#fff" size={30} />
                                            ) : (
                                                <div className={styles.check}> <IoMdCheckmark /> </div>
                                            )
                                        }
                                    </div>
                                    <div className={styles.groupInfo}>
                                        <h1 className={styles.text_groupInfo}>Confirm Service Fees: </h1>
                                        <p className={styles.text_p}>Verify the service fee details in your MetaMask wallet, then click ‘Confirm’ to proceed.</p>
                                    </div>
                                </div>


                                <div className={styles.loadingContent}>
                                    <div className='w-8 h-8'>
                                        {
                                            steps?.approval ? (
                                                <DotLoader color="#fff" size={30} />
                                            ) : (
                                                <>
                                                    {complete?.approval ? <div className={styles.check}> <IoMdCheckmark /> </div> : <div className={styles.notcheck}> <IoMdCheckmark /> </div>}
                                                </>
                                            )
                                        }
                                    </div>

                                    <div className={styles.groupInfo}>
                                        <h1 className={styles.text_groupInfo}>Approve the CAP Request:</h1>
                                        <p className={styles.text_p}>Review the details of the spending cap request, and authorize it by clicking ‘Approve’.</p>
                                    </div>
                                </div>



                                <div className={styles.loadingContent}>
                                    <div className='w-8 h-8'>
                                        {
                                            steps?.deposit ? (
                                                <DotLoader color="#fff" size={30} />
                                            ) : (
                                                <>
                                                    {complete?.deposit ? <div className={styles.check}> <IoMdCheckmark /> </div> : <div className={styles.notcheck}> <IoMdCheckmark /> </div>}
                                                </>
                                            )
                                        }
                                    </div>
                                    <div className={styles.groupInfo}>
                                        <h1 className={styles.text_groupInfo}>Start Staking:</h1>
                                        <p className={styles.text_p}>To begin staking, pay the gas fees by clicking ‘Confirm’. </p>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </>



            {loadingLpTokonUn || loadingSimple ? (
                <div className="fixed  top-0 left-0 right-0 w-full h-full bg-black/10 backdrop-opacity-16  backdrop-blur-[0.5px] z-[10000]"></div>
            ) : null}

            <>
                <div
                    className={`${styles.modal} ${loadingLpTokonUn || loadingSimple ? styles.modalshow : ""
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

export default StakingDetailsSimple