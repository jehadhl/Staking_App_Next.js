import React from 'react'
import RewardsContent from './RewardsContent/RewardsContent'
import styles from "./ClaimRewardsHeader.module.scss"
import ClaimRewards from './ClaimRewards/ClaimRewards'


const ClaimRewardsHeader = ({ text, rewards, isLoadingMyStack, getRewards, nameToken }: any) => {
  return (
    <div className={styles.gridClaimRewardsHeader}>
      <div className={styles.secOne}>
        <RewardsContent
          text={"Your ZENT Reward"}
          label={text}
          nameToken={nameToken}
        />
      </div>

      <div className={styles.secTwo}>

        <ClaimRewards
          currentzent={"54 %"}
          isLoadingMyStack={isLoadingMyStack}
          zentToken={rewards}
          getRewards={getRewards}
        />

      </div>

    </div>
  )
}

export default ClaimRewardsHeader