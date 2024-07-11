import logoImage from "../../public/images/logoImage.png"
import xrpImage from "../../public/images/XRP.png"
import usdImage from "../../public/images/udc.png"
import ltcImage from "../../public/images/Litecoin.png"


export const percentageStake = [
    {
        id: 1,
        value: 25 ,
        label : "25%"
    },
    {
        id: 2,
        value: 50 ,
        label : "50%"
    },
    {
        id: 3,
        value: 75 ,
        label : "75%"
    },
    {
        id: 4,
        value: 100 ,
        label : "100%"
    }
]


export const dataYourPool = [
    {
        id: 1,
        RPB: 0.04342,
        details: {
            name: "zent/uniswap-pool-1",
            image: logoImage,
        },
        Network: "Ethereum",
        Liquidity: "$23,6.13",
        LPTStaked: "4.5423",
        APY: "10.78%"
    },
    {
        id: 2,
        RPB: 0.04342,
        details: {
            name: "zent/uniswap-pool-2",
            image: logoImage,
        },
        Network: "Ethereum",
        Liquidity: "$23,6.13",
        LPTStaked: "4.5423",
        APY: "12.58%"
    },
    {
        id: 3,
        RPB: 0.04342,
        details: {
            name: "LTC",
            image: ltcImage,
        },
        Network: "Ethereum",
        Liquidity: "$23,6.13",
        LPTStaked: "45.54",
        APY: "45.58%"
    },
    {
        id: 4,
        RPB: 0.04342,
        details: {
            name: "LTC",
            image: usdImage,
        },
        Network: "Ethereum",
        Liquidity: "$23,6.13",
        LPTStaked: "45.54",
        APY: "21.58%"
    },
    {
        id: 5,
        RPB: 0.04342,
        details: {
            name: "LTC",
            image: xrpImage,
        },
        Network: "Ethereum",
        Liquidity: "$23,6.13",
        LPTStaked: "45.54",
        APY: ".58%"
    },

]


export const tokenStakingDetails = [
    {
        id: 1,
        Duration: "90Days",
        RPB: 0.04342,
        Liquidity: "$23,6.13",
        LPTStaked: "45.54",
        APY: "45.58%"
    },
    {
        id: 2,
        Duration: "180Days",
        RPB: 0.04342,
        Liquidity: "$23,6.13",
        LPTStaked: "45.54",
        APY: "45.58%"
    },
    {
        id: 3,
        Duration: "385Days",
        RPB: 0.04342,
        Liquidity: "$23,6.13",
        LPTStaked: "45.54",
        APY: "45.58%"
    },
]

export const DAP_URL = process.env.NEXT_PUBLIC_URL || "dapp://user-staking-dev.zentu.com";
export const checkUserTxCount = 3
export const API_URL = process.env.NEXT_PUBLIC_API_URL


