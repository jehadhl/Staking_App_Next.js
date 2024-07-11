import React from 'react'
import styles from "./Navbar.module.scss"
import Image from 'next/image'
import logo from "../../../public/images/zentulogo.png"
import Link from 'next/link'
import ButtonConnectWallet from "../ButtonConnectWallet/ButtonConnectWallet"
import ImageB from "../../../public/images/bookcheck.png"

const Navbar = () => {

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href={"/"}>
          <Image
            src={logo}
            height={50}
            width={131}
            alt='logo'
          />
        </Link>

      
        <div className={styles.showBtn}>

        <div className={`${styles.btnContainer} S-280:hidden S-900:block`} >
            <Link href={"https://app.uniswap.org/explore/tokens/ethereum/0x3e985250cb137fc1ff55922116934c5982d29f85"} target='_blank'  >
              <span className={styles.btn}  >

                Get ZENT
              </span>
            </Link>
          </div>

          <div className={`${styles.btnContainer} S-280:hidden S-900:block`} >
            <Link href={"https://app.uniswap.org/add/v2/0xdAC17F958D2ee523a2206206994597C13D831ec7/0x3E985250CB137fc1Ff55922116934C5982d29F85"} target='_blank'  >
              <span className={styles.btn}  >

                Get LP tokens
              </span>
            </Link>
          </div>

          <Link href={"https://zentu.com/staking-manual.html"} target='_blank' className={styles.btnContainer} >
            <span className={styles.btn}  >
              <Image src={ImageB} width={20} height={40} quality={100} priority alt="imag_0" className='w-[20px] h-[20px]' />
              User Manual
            </span>
          </Link>

          <div className='S-280:hidden S-900:block'>
            <ButtonConnectWallet />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar