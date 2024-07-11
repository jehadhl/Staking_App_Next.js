import { WalletState } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';



const initialState: WalletState = {
    metaMaskWallet: {
        type: "metaMask",
        selectedAccount: null,
        signedAccount: null,
    },
    address: null,
    userMemo: null,
    userId: null,
    connecting: false,
    networkId: null,
    signUpModal: false ,
    switchNetwork : false ,
    network : {
        chainId : "" ,
        name : ""
    }
};


export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        addSignedSelectedAccount: (state, action: PayloadAction<string | any>) => {
            if (action.payload) localStorage.removeItem("signedAccount");
            else localStorage.setItem("signedAddress", action.payload);
      
            state.metaMaskWallet.signedAccount = action.payload;
            state.metaMaskWallet.selectedAccount = action.payload;
          },
        addUserData: (state, action: PayloadAction<any>) => {
            const { address, userMemo, userId } = action.payload;
            state.metaMaskWallet.signedAccount = address;
            state.metaMaskWallet.selectedAccount = address;
            state.userMemo = userMemo;
            state.userId = userId;
            return state;
        },
        setConnectWallet: (state, action) => {
            state.connecting = action?.payload || false;
        },

        setAddress: (state, action) => {
            state.address = action?.payload
        },

        toggleSignupModal: (state, action: PayloadAction<boolean>) => {
            state.signUpModal = action.payload;
        },


        setSwitchNetwork: (state, action) => {
            state.switchNetwork = action?.payload;
        },

        setNetwork: (state, action) => {
       
            state.network.chainId = action?.payload.chainId;
            state.network.name = action?.payload.name;
        },

        signOut: (state) => {
            Cookies.remove("token");
            localStorage.clear();
            state.metaMaskWallet.signedAccount = null;
            state.metaMaskWallet.selectedAccount = null;
            state.userMemo = null;    
            state.userId = null;   
        },

        cancelSignModal: (state, action : PayloadAction<boolean>) => {
            state.metaMaskWallet.selectedAccount = null;
            state.metaMaskWallet.signedAccount = null;
            state.signUpModal = action?.payload;
            state.switchNetwork = action?.payload;
            state.connecting = false;
            state.userMemo = null;
           
        }
    }
})

export const { setConnectWallet, setSwitchNetwork, toggleSignupModal, setAddress, signOut, cancelSignModal, addUserData, addSignedSelectedAccount , setNetwork } = walletSlice.actions;
export default walletSlice.reducer;
