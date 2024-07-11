"use client";
import React, { useEffect } from 'react'
import styles from "./SelectPlan.module.scss"
import { BsArrowLeft } from 'react-icons/bs'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logoImage from "../../../public/images/logoImage.png"
import { usePlans } from '@/hooks/usePlans';
import PlanSkeleton from '@/shared/PlanSkeleton';
import { setSelectSimpleStack } from '@/redux/slices/selectSlice';
import { useAppSelector } from '@/redux/hook';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import ButtonConnectWallet from '@/components/ButtonConnectWallet/ButtonConnectWallet';
const SelectPlan = () => {
    const router = useRouter()
    const { data, loading, error } = usePlans()
    const dispatch = useDispatch()
    const { selectSimpleStake } = useAppSelector(state => state.contract)

    useEffect(() => {
        if (data?.data.length > 0) {
            const initialData = data?.data[selectSimpleStake?.index];
            if (initialData) {
                dispatch(setSelectSimpleStack(initialData))
            }
        }
    }, [data, selectSimpleStake])

    const handleSelectSimpleToken = (item: any) => {

        dispatch(setSelectSimpleStack(item));
    };


    const handleClick = () => {
        router.push("/token-only-staking")
    }

   

    return (
        <>
            <section className={styles.SelectPlan}>
                <div className={styles.showBtn}>
                    <div className='flex w-full gap-2'>
                        <div className={styles.btnContainer}>
                            <Link href={"https://app.uniswap.org/add/v2/0xdAC17F958D2ee523a2206206994597C13D831ec7/0x3E985250CB137fc1Ff55922116934C5982d29F85"} target='_blank'  >
                                <span className={styles.btn}  >

                                    Get LP tokens
                                </span>
                            </Link>
                        </div>
                        <div className={styles.btnContainer}>
                            <Link href={"https://app.uniswap.org/explore/tokens/ethereum/0x3e985250cb137fc1ff55922116934c5982d29f85"} target='_blank'  >
                                <span className={styles.btn}  >

                                    Get ZENT
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.linee} />


                    <ButtonConnectWallet />
                </div>
                <div className={styles.SelectPlan_Card}>
                    <div className={styles.SelectPlan_Content}>
                        <div className={styles.flexHeader}>
                            <BsArrowLeft className='text-white w-5 h-5 text-3xl  cursor-pointer' onClick={() => router.push("/")} />
                            <h1 className={styles.text}>Select Your Plan</h1>
                        </div>
                        <p className={styles.paragraph}>Pick a desired plan based on the duration, block generation, annual percentage yield, and gas fees</p>
                    </div>

                    <div className={styles.cards}>
                        {loading ? (
                            <>
                                <PlanSkeleton />
                                <PlanSkeleton />
                                <PlanSkeleton />
                            </>
                        ) : (

                            <>
                                {data?.data?.map((item: any, index: number) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <div className={`${styles.cards_items} ${item.did === selectSimpleStake.did ? styles.activeBackground : ""}`} key={index} onClick={() => handleSelectSimpleToken(item)}>
                                                <div className={styles.cards_items_header}>
                                                    <Image src={logoImage} className={styles.img} priority alt='image_0' />
                                                    <h1 className={styles.text}>
                                                        Plan 0{index + 1}
                                                    </h1>
                                                </div>
                                                <div className={styles.line} />
                                                <div className={styles.body}>
                                                    <div className={styles.sec1}>
                                                        <div className={`${styles.sec1_one} ${styles.sec1_one_one}`}>
                                                            <h1 className={styles.text}>ID</h1>
                                                            <p className={styles.paragraph}>{item.did}</p>
                                                        </div>

                                                        <div className={`${styles.sec1_one} ${styles.sec1_one_two}`}>
                                                            <h1 className={styles.text}>Duration</h1>
                                                            <p className={styles.paragraph}>{item.duration}</p>
                                                        </div>

                                                        <div className={`${styles.sec1_one} ${styles.sec1_one_three}`}>
                                                            <h1 className={styles.text}>Zentu Per Block</h1>
                                                            <p className={styles.paragraph}>{item.zentuPerBlock}</p>
                                                        </div>


                                                        <div className={`${styles.sec1_one} ${styles.sec1_one_four}`}>
                                                            <h1 className={styles.text}>APY</h1>
                                                            <p className={styles.paragraph}>{item.apy.toFixed(4)}%</p>
                                                        </div>


                                                        <div className={`${styles.sec1_one} ${styles.sec1_one_five}`}>
                                                            <h1 className={styles.text}>Zentu Staked</h1>
                                                            <p className={styles.paragraph}>{item.zentuStaked.toFixed(2)} ZENT</p>
                                                        </div>




                                                        <div className={`${styles.sec1_one} ${styles.sec1_one_six}`}>
                                                            <h1 className={styles.text}>Service Fee</h1>
                                                            <p className={styles.paragraph}>{item.serviceFee} ETH</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                })}

                            </>
                        )}


                    </div>

                    <button className={styles.btn} onClick={handleClick}>
                        Select
                    </button>
                </div>
            </section>
        </>
    )
}

export default SelectPlan