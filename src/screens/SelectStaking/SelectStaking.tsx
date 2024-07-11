'use client'
import React, { useEffect, useState } from 'react'
import styles from './SelectStaking.module.scss'
import { CiWallet } from "react-icons/ci";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import useWalletConnection from '@/hooks/useConnection';
import { useRouter } from "next/navigation"
import ButtonConnectWallet from '@/components/ButtonConnectWallet/ButtonConnectWallet';
import { useSelectToken } from '@/hooks/useSelectToken';
import CardSkeleton from '@/shared/CardSkeleton';
import TokenItem from '@/components/TokenItem/TokenItem';
import LpItem from '@/components/LPItem/LpItem';
import { setSelect, setSelectContarct } from "../../redux/slices/selectSlice"
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { signOut } from '@/redux/slices/walletSlice';





const SelectStaking = () => {
  // @ts-ignore
  const { ethereum = null } = window;
  const provider: any = ethereum ? new ethers.providers.Web3Provider(ethereum) : null;

  const { connectWallet } = useWalletConnection();
  const { dataSelectToken, loading, active, setActive, setAddressContract, adderssContract } = useSelectToken()
  const connectedWallet = useSelector((state: any) => state.wallet.metaMaskWallet.signedAccount);
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { network: networkC } = useSelector((state: any) => state.wallet)


  const handleClick = (tx: string, value: any) => {
    if (tx === active && active !== "") {
      return;
    }
    setActive(tx);
    setAddressContract(value)
  }

  const handleSelect = async () => {
    const signer = provider?.getSigner();

    if (!connectedWallet) {
      connectWallet();
      return;
    }
    const network = await provider.getNetwork()
    const hexChainId = "0x" + network.chainId.toString(16);

    try {
      const expectedChainId = `${networkC.chainId}`;
      // console.log(network , provider , hexChainId , networkC.chainId , expectedChainId) 
      if (hexChainId !== expectedChainId) {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `${networkC?.chainId}` }]
        });
      }

      const routePath = active === "token" ? "/token-only-staking" : "/lp-token-staking";
      const contractType = active === "token" ? "simpleStakingContract" : "lpStakingContract";
       
      const token = Cookies.get("token")

  
      if (signer?._isSigner && token) {
        router.push(routePath)
        dispatch(setSelect(contractType))
        dispatch(setSelectContarct({
          type: contractType,
          address: adderssContract
        }));
      }
      else {
        toast.error("Please make signature");
        dispatch(signOut())
      }

    } catch (error: any) {
      if (error.code === 4001) {
        toast.error("The user doesn't want to change the network!");
      } else if (error.code === 4902) {
        toast.error("This network is not in the user's wallet");
      } else {
        toast.error(`Error ${error.code}: ${error.message}`);
      }
    }
  };




  return (
    <>
      <section className={styles.SelectStaking}>
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



        <div className={styles.SelectStaking_Card}>
          <div className={styles.SelectStaking_Content}>
            <h1 className={styles.text}>Select Your Staking</h1>
            <p className={styles.paragraph}>Power the blockchain network's security with staking and earn rewards as well .</p>

          </div>

          <div className={styles.gridCard}>
            {
              loading ? (
                <>
                  <CardSkeleton />
                  <CardSkeleton />
                </>
              ) : (
                <>
                  {dataSelectToken?.data?.plans?.length > 0 && (
                    <>
                      {
                        dataSelectToken?.data.plans?.map((item: any, index: any) => {
                          return (
                            <React.Fragment key={item._id}>


                              {item.tag === 'lp' && (
                                <LpItem item={item} active={active} handleClick={handleClick} contractAddress={dataSelectToken?.data} />
                              )}

                              {item.tag === 'token' && (
                                <TokenItem item={item} active={active} handleClick={handleClick} contractAddress={dataSelectToken?.data} />
                              )}
                            </React.Fragment>
                          )
                        })
                      }
                    </>
                  )
                  }
                </>
              )
            }
          </div>

          <button disabled={loading === true} className={`${styles.btn_Connect_Wallet} ${loading ? styles.loading : "cursor-pointer"}`} onClick={handleSelect}>
            {
              connectedWallet ? "Continue" : (
                <>
                  <CiWallet className={styles.icon} />
                  <span>Connect Wallet</span>
                </>
              )}
          </button>
        </div>
      </section>





    </>
  )
}

export default SelectStaking