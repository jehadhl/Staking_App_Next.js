import React from "react";

export interface ClaimRewadsType {
    currentzent: string | number;
    AvailableRewards: string | number;
    zentToken: string | number;
}

export type IResponse = {
    data: any;
    statusCode: number;
    message?: string;
    [key: string]: any;
};


export interface CustomModal {
    open: boolean,
    close: () => void,
    width: string,
    children: React.ReactNode;
    type ?: string ,
    zindex : number
}

interface PoolInfo {
    duration: string;
    poolPeriod: number;
    rpb: number;
    totalStaked: number;
    zentuStaked: number;
    apy: null | string | number
}

export interface PoolInfoLp {
    apy: null | string | number;
    network: string;
    pid: number;
    userBalanceAvailableToStake: number | string | any;
    liquidity: number;
    lpContractAddress: string;
    name: string
    rpb: string | number;
    lptStaked: number;

}

interface Data {
    chainName: string;
    ownerAddress: string;
    poolLength: number;
    poolInfo: PoolInfo[];
}

export interface ApiPoolResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Data;
    error: any[];
}

interface ItemTokenProps {
    createdAt: string,
    duration: number[],
    minimumStake: number
    network: string,
    rewardToken: string,
    serviceFee: number,
    tag: string,
    title: string,
    tvl: string | number,
    updatedAt: string,
    _id: string,
    isEnabled: boolean ,
    tvlInZentu : number ,
    apy : number

}

interface ItemLPProps {
    createdAt: string,
    updatedAt: string,
    _id: string,
    tag: string,
    title: string,
    totalPool: string | number,
    tvl: string | number,
    apy: any,
    network: string,
    rewardToken: string
    isEnabled: boolean ,
    lpstakingTVLInUSD : number
    tvlInZentu: number
}


export interface TokeItemType {
    item: ItemTokenProps,
    handleClick: (tsx: string, value: string) => void,
    active: string,
    contractAddress: string | any
}

export interface LpTokenType {
    item: ItemLPProps,
    handleClick: (tsx: string, value: string) => void,
    active: string,
    contractAddress: string | any
}

export interface WalletState {
    metaMaskWallet: {
        type: string,
        selectedAccount: null,
        signedAccount: null,
    }
    address: null | string;
    userMemo: null | string;

    userId: string | null;
    connecting: boolean;
    networkId: string | null;
    signUpModal: boolean;
    switchNetwork: boolean;
    network: {
        chainId: string;
        name: string
    }
}

interface DataLp {
    chainName: string;
    ownerAddress: string;
    poolLength: number;
    poolInfo: PoolInfoLp[];
}




export interface LpAllPool {
    success: boolean;
    statusCode: number;
    message: string;
    data: DataLp;
    error: any[];
}



export interface SelectSimpleTokenT {
    loading: boolean,
    data: any,
}