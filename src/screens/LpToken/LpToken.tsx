"use client"
import React, { useCallback, useEffect, useState } from 'react'
import styles from './LpTokenStaking.module.scss'
import ClaimRewardsHeader from '@/components/ClaimRewardsHeader/ClaimRewardsHeader'
import YourPoolTable from '../../components/YourPoolTable/YourPoolTable'
import AllPoolTable from '../../components/AllPoolTable/AllPoolTable'
import StakingDetails from '@/components/StakingDetails/StakingDetails'
import ButtonConnectWallet from '@/components/ButtonConnectWallet/ButtonConnectWallet'
import { useLpToken } from '@/hooks/useLpPool'
import { setClaimRewards, setSelectLpStack, setSelectPlanLp, setStackedSucessful, setUntackedSucessful } from '@/redux/slices/selectSlice'
import { useAppSelector } from '@/redux/hook'
import { useLpTokenContract } from './LpToken.hook'
import { useAvaibleLpPool } from '@/hooks/useAvaibleLpPool'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import ImageS from "../../../public/images/sucess.png"
import ImageA from "../../../public/images/activeIcon.png"
import ImageH from "../../../public/images/Vectorsd.svg"
import CustomModal from '@/components/CustomModal/CustomModal'
import NextLink from 'next/link'
import toast from 'react-hot-toast'
import useHistory from '@/hooks/useHistory'
import HistoryLp from '@/components/HistoryLp/HistoryLp'
import { Pagination } from 'antd'
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io'
import BigNumber from 'bignumber.js'



const LpToken = () => {
  const dispatch = useDispatch()
  const { stackedSucessful, txId, value: amount, stackedUnSucessful, selectPlanLp, selectLpStake, claimRewards } = useAppSelector((state: any) => state.contract)
  const { value, handleChange, errorUnStack, setValue,
    rewardClaimable, pid, serviceFee, loadingLpTokon, percentage, handleClickPercentage, error, unStakeLp, stackLpToken, pidPlan, setActive, setPercentage,
    active, steps, complete, loadingLpTokonUn, getRewards, decimals, decimalsSs } = useLpTokenContract()
  const { data, isLoadingMyStack } = useLpToken()
  const { poolAvailableData, isLoading } = useAvaibleLpPool()


  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(1);


  const handleClose = () => {
    dispatch(setStackedSucessful(false))
    dispatch(setUntackedSucessful(false))
    dispatch(setClaimRewards(false))
  }


  const handleClick = useCallback((value: string) => {
    setActive(value)
    setValue(0)
    setPercentage(0)
  }, [active])


  const handleClickLp = (item: any) => {
    dispatch(setSelectLpStack(item));
    setPercentage(0)
  };


  useEffect(() => {
    if (data) {

      dispatch(setSelectLpStack(data?.data?.poolInfo[0]));
    }
  }, [data, pidPlan, dispatch])


  ///////plan ////////////////////////
  const handleClickLpPlan = (item: any) => {
    dispatch(setSelectPlanLp(item))
    setPercentage(0)
  };




  const handleCopy = () => {
    if (txId) {
      navigator.clipboard.writeText(txId)
        .then(() => {
          toast.success("copy sucessful")
        })
        .catch((error) => {
          toast.error("Failed to copy")
        });
    }
  };



  const { loadingHistory, history, errorHistory } = useHistory(currentPage, itemsPerPage, active, "lp")


  const onPageChange = (page: number, pageSize: number) => {

    setCurrentPage(page);
    setItemsPerPage(pageSize);
  };

  const handlePageChange = (e: any, page: any) => {
    const totalPages = Math.ceil((history?.data?.totalCount / itemsPerPage));

    if (page === "inc" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (page === "dec" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };



  const stringValue = decimals.toString();
  const match = stringValue.match(/^1(0*)/)
  const decimalsLength = match ? match[1].length : 0;
  const percision = decimalsLength






  useEffect(() => {
    dispatch(setSelectPlanLp(poolAvailableData?.data[0]))
  }, [poolAvailableData])




  return (
    <>
      <section className={styles.LpTokenStaking}>

        <div className={styles.showBtn}>
          <ButtonConnectWallet />
        </div>
        <div className={styles.LpTokenStaking_headers}>
          <ClaimRewardsHeader
            text={"Through LP Token staking, you can easily earn rewards based on your selected options after each block is produced. "}
            rewards={rewardClaimable}
            isLoadingMyStack={isLoadingMyStack}
            getRewards={getRewards}
          />
        </div>

        <div className={styles.stakingDetailsCard}>
          <div className={styles.gridSection}>
            <div className={styles.secOne}>
              <StakingDetails
                handleChange={handleChange}
                value={value}
                staked={selectLpStake.lptStaked}
                userBalanceAvailableToStake={poolAvailableData?.data[0]?.userBalanceAvailableToStake}
                serviceFee={serviceFee}
                percentage={percentage}
                handleClickPercentage={handleClickPercentage}
                error={error}
                unStackToken={unStakeLp}
                stackToken={stackLpToken}
                loading={loadingLpTokon}
                nameToken={"LP"}
                errorStack={errorUnStack}
                isLoading={isLoading}
                isLoadingMyStack={isLoadingMyStack}
                rewardClaimable={data?.data?.totalClaim}
                active={active}
                dataLength={data?.data?.poolInfo.length}
                steps={steps}
                complete={complete}
                loadingLpTokonUn={loadingLpTokonUn}
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

              <div className={`${styles.showinfo} ${active === "avaible-stack" ? styles.mt : ""}`}>
                {
                  active === "avaible-stack" ? (
                    <AllPoolTable data={poolAvailableData} loading={isLoading} selectPlanLp={selectPlanLp} handleClick={handleClickLpPlan} />
                  ) : active === "my-stake" ? (
                    <YourPoolTable data={data} isLoadingMyStack={isLoadingMyStack} selectedLp={selectLpStake} handleClick={handleClickLp} />
                  ) : active === "history" ? (
                    <>
                      <HistoryLp loadingHistory={loadingHistory} history={history} errorHistory={errorHistory} current />
                      {history?.data?.totalCount > 0 && (
                        <div className={styles.footerOfTable} >


                          <button
                            className={`${styles.iconWrapper} ${currentPage === 1 ? styles.opacity : ""}`}
                            disabled={currentPage === 1}
                            onClick={(e) => handlePageChange(e, "dec")}
                          >

                            <IoMdArrowBack className={styles.icon} />
                          </button>


                          <h1 className='text-white text-sm'>Page {currentPage} of  {history?.data?.totalCount > 0 ? Math.ceil((history?.data?.totalCount / itemsPerPage)) : currentPage}</h1>

                          <button
                            disabled={currentPage === Math.ceil((history?.data?.totalCount / itemsPerPage))}
                            className={`${styles.iconWrapper} ${currentPage === Math.ceil((history?.data?.totalCount / itemsPerPage)) ? styles.opacity : ""}`}
                            onClick={(e) => handlePageChange(e, "inc")}
                          >

                            <IoMdArrowForward className={styles.icon} />
                          </button>
                        </div>
                      )}

                    </>
                  ) : null
                }
              </div>
            </div>
          </div>
        </div>

      </section>

      <CustomModal
        open={stackedSucessful}
        close={() => handleClose()}
        width="420px"
        zindex={1000}
      >
        <div className="flex flex-col gap-2 md:gap-3 w-full items-center py-2 md:py-2 px-2 ">
          <Image src={ImageS} alt="img_metaMask" />
          {/* <div className="min-w-[400px] mt-0 pt-0">
            <div className="text-white text-center w-full text-base md:text-lg font-[500]">
              Congratulations! You have successfully
            </div>
            <p className=" text-[#9CA4AB] text-sm md:text-base text-center mt-1">
              Staked {(Number(amount))?.toFixed(percision)} LP.
            </p>

          </div> */}

          <div className=" mt-0 pt-0">
            <div className="text-white text-center w-full text-base md:text-lg font-[500]">
              Congratulations!
            </div>
            <p className=" text-white ttext-base md:text-lg font-[500] text-center my-1">
              You’ve successfully staked
            </p>
            <p className=" text-[#9CA4AB] text-sm md:text-base text-center ">
              {(Number(amount))?.toFixed(percision)}  Lp.
            </p>

          </div>
          <div className={styles.input}>
            <h2 className={styles.inputText} onClick={handleCopy}>
              {txId?.length > 0 ? `${txId.slice(0, 14)}..........${txId.slice(-14)}` : txId}

            </h2>

            <h2 className={styles.inputText2} onClick={handleCopy}>
              {txId?.length > 0 ? `${txId.slice(0, 8)}..........${txId.slice(-6)}` : txId}
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
          <div className="min-w-[400px] mt-0 pt-0">
            <div className="text-white text-center w-full text-base md:text-lg font-[500]">
              Congratulations!
            </div>
            <p className=" text-white ttext-base md:text-lg font-[500] text-center my-1">
              You’ve successfully staked
            </p>
            <p className=" text-[#9CA4AB] text-sm md:text-base text-center mt-1">
              unstaked {(Number(amount))} LP.
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
        width="420px"
        zindex={1000}
      >
        <div className="flex flex-col gap-2 md:gap-3 w-full items-center py-2 md:py-2 px-2 ">
          <Image src={ImageS} alt="img_metaMask" />
          <div className="min-w-[400px] mt-0 pt-0">
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

export default LpToken