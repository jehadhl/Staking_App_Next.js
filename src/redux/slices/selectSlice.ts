import { createSlice } from '@reduxjs/toolkit'



interface SelectState {
    selectContract: {
        type: string,
        address: string,
    },

    selectPlanLp: {
        stakeType: string,
        pid: number,
        name: number | string,
        totalAllocPoint: number,
        totalZentuPerBlock: number,
        lpTokenContract: "",
        decimals: 0,
        apy: string,
        zentuPerBlock: number,
        serviceFee: number,
        userBalanceAvailableToStake: number | string | any
    },
    selectLpStake: {
        apy: string | null | number,
        network: string,
        pid: number | number,
        userBalanceAvailableToStake: number | string | any,
        liquidity: number | string,
        lpContractAddress: string,
        name: string,
        rpb: string | number,
        lptStaked: number | string,
        decimals: number | string,
        serviceFee: number,
        rewardClaimable: number | string,
        index: number
    },

    selectSimpleStake: {
        index: number , 
        duration: string,
        poolPeriod: number,
        rpb: number,
        totalStaked: number,
        zentuStaked: number,
        apy: string,
        did: number,
        serviceFee: number,
        decimals: number | string | any,
        userBalanceToStake: number,
        percentage: number
    },


    selectSimpleStakeById: {
        index: number,
        transactionId: number,
        duration: string,
        poolPeriod: number,
        rpb: string,
        totalStaked: number,
        apy: string,
        did: number,
        serviceFee: number,
        decimals: number,
        rewardClaimable: number,
        unlockTime: string,
        isWithdrawUnlocked: string | boolean
    },

    stackedSucessful: boolean,
    stackedUnSucessful: boolean,
    select: string,
    emergencyWithdraw: boolean,
    claimRewards: boolean,
    unStakeZent: boolean,
    txId: string,
    value: number | string
}

const initialState: SelectState = {
    selectContract: {
        type: "",
        address: "",

    },





    selectPlanLp: {
        stakeType: "",
        pid: 0,
        lpTokenContract: "",
        name: "",
        totalAllocPoint: 0,
        totalZentuPerBlock: 0,
        apy: "",
        zentuPerBlock: 0,
        serviceFee: 0,
        decimals: 0,
        userBalanceAvailableToStake: 0
    },

    selectLpStake: {
        apy: "",
        network: "",
        pid: 0,
        userBalanceAvailableToStake: 0,
        liquidity: "",
        lpContractAddress: "",
        name: "",
        rpb: "",
        lptStaked: 0,
        serviceFee: 0,
        decimals: "",
        index: 0,
        rewardClaimable: 0
    },

    selectSimpleStake: {
        index: 0,
        decimals: 0,
        duration: "",
        poolPeriod: 0,
        rpb: 0,
        totalStaked: 0,
        zentuStaked: 0,
        apy: "",
        did: 0,
        serviceFee: 0,
        userBalanceToStake: 0,
        percentage: 0
    },

    selectSimpleStakeById: {
        index: 0,
        transactionId: 0,
        duration: "",
        poolPeriod: 0,
        rpb: "",
        totalStaked: 0,
        apy: "",
        did: 0,
        serviceFee: 0,
        decimals: 0,
        rewardClaimable: 0,
        unlockTime: "",
        isWithdrawUnlocked: ""
    },

    stackedSucessful: false,
    stackedUnSucessful: false,
    emergencyWithdraw: false,
    unStakeZent: false,
    claimRewards: false,
    txId: "",
    value: 0,
    select: "",
};

export const selectContractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {

        setSelectContarct: (state, action) => {
            state.selectContract.type = action.payload.type;
            state.selectContract.address = action.payload.address;

        },

        setSelectLpStack: (state, action) => {
            state.selectLpStake.apy = action.payload ? action.payload.apy : ""
            state.selectLpStake.decimals = action.payload ? action.payload.decimals : "";
            state.selectLpStake.liquidity = action.payload ? action.payload.liquidity : "";
            state.selectLpStake.lpContractAddress = action.payload ? action.payload.lpContractAddress : "";
            state.selectLpStake.lptStaked = action.payload ? action.payload.lptStaked : "";
            state.selectLpStake.name = action.payload ? action.payload.name : "";
            state.selectLpStake.network = action.payload ? action.payload.network : "";
            state.selectLpStake.pid = action.payload ? action.payload.pid : "";
            state.selectLpStake.rpb = action.payload ? action.payload.rpb : "";
            state.selectLpStake.userBalanceAvailableToStake = action.payload ? action.payload.userBalanceAvailableToStake : "";
            state.selectLpStake.serviceFee = action.payload ? action.payload.serviceFee : "";
            state.selectLpStake.rewardClaimable = action.payload ? action.payload.rewardClaimable : "";
        },



        setSelect: (state, action) => {
            state.select = action.payload;
        },

        setSelectSimpleStack: (state, action) => {
            state.selectSimpleStake.index = action.payload?.index;
            state.selectSimpleStake.apy = action.payload?.apy;
            state.selectSimpleStake.duration = action.payload?.duration;
            state.selectSimpleStake.decimals = action.payload?.decimals;
            state.selectSimpleStake.poolPeriod = action.payload?.poolPeriod,
            state.selectSimpleStake.rpb = action.payload?.rpb,
            state.selectSimpleStake.totalStaked = action.payload?.totalStaked,
            state.selectSimpleStake.zentuStaked = action.payload?.zentuStaked,
            state.selectSimpleStake.did = action.payload?.did
            state.selectSimpleStake.serviceFee = action.payload?.serviceFee
            state.selectSimpleStake.userBalanceToStake = action.payload?.userBalanceToStake
            state.selectSimpleStake.percentage = action.payload?.percentage
        },

        setSlectSimpleStakeById: (state, action) => {
            state.selectSimpleStakeById.did = action.payload?.did;
            state.selectSimpleStakeById.index = action.payload?.index;
            state.selectSimpleStakeById.transactionId = action.payload?.transactionId;
            state.selectSimpleStakeById.duration = action.payload?.duration;
            state.selectSimpleStakeById.poolPeriod = action.payload?.poolPeriod;
            state.selectSimpleStakeById.rpb = action.payload?.rpb;
            state.selectSimpleStakeById.totalStaked = action.payload?.totalStaked;
            state.selectSimpleStakeById.decimals = action.payload?.decimals;
            state.selectSimpleStakeById.apy = action.payload?.apy;
            state.selectSimpleStakeById.poolPeriod = action.payload?.poolPeriod;
            state.selectSimpleStakeById.rewardClaimable = action.payload?.rewardClaimable
            state.selectSimpleStakeById.unlockTime = action.payload ? action?.payload?.unlockTime : ""
            state.selectSimpleStakeById.isWithdrawUnlocked = action.payload ? action?.payload?.isWithdrawUnlocked : ""
        },

        setStackedSucessful: (state, action) => {
            state.stackedSucessful = action.payload
        },

        setUntackedSucessful: (state, action) => {
            state.stackedUnSucessful = action.payload
        },

        setClaimRewards: (state, action) => {
            state.claimRewards = action.payload
        },

        setTxId: (state, action) => {
            state.txId = action.payload
        },

        setAmout: (state, action) => {
            state.value = action.payload
        },

        setEmengercyWithdraw: (state, action) => {
            state.emergencyWithdraw = action.payload;
        },

        setUnStakeZent: (state, action) => {
            state.unStakeZent = action.payload;
        },

        setSelectPlanLp: (state, action) => {
            state.selectPlanLp.name = action.payload ? action.payload.name : ""
            state.selectPlanLp.apy = action.payload ? action.payload.apy : ""
            state.selectPlanLp.pid = action.payload ? action.payload.pid : ""
            state.selectPlanLp.decimals = action.payload ? action.payload.decimals : ""
            state.selectPlanLp.serviceFee = action.payload ? action.payload.serviceFee : ""
            state.selectPlanLp.lpTokenContract = action.payload ? action.payload.lpTokenContract : ""
            state.selectPlanLp.stakeType = action.payload ? action.payload.stakeType : ""
            state.selectPlanLp.totalAllocPoint = action.payload ? action.payload.totalAllocPoint : ""
            state.selectPlanLp.totalZentuPerBlock = action.payload ? action.payload.totalZentuPerBlock : ""
            state.selectPlanLp.zentuPerBlock = action.payload ? action.payload.zentuPerBlock : ""
            state.selectPlanLp.userBalanceAvailableToStake = action.payload ? action.payload.userBalanceAvailableToStake : 0
        }
    }
})

export const { setSelectContarct, setSelectLpStack, setSelectSimpleStack, setEmengercyWithdraw, setSelect, setUnStakeZent, setSlectSimpleStakeById, setClaimRewards, setStackedSucessful, setTxId, setAmout, setSelectPlanLp, setUntackedSucessful } = selectContractSlice.actions;
export default selectContractSlice.reducer;
