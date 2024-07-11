import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './slices/walletSlice';
import {
  persistStore,
  persistReducer,

} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import selectReducer from "./slices/selectSlice"


const persistWalletConfig = {
  key: "wallet",
  storage,
  whitelist: ["metaMaskWallet", "userId", "userMemo", "network"],
};

const persistSelectWalletConfig = {
  key: "select",
  storage,
  whitelist: ["selectContract", "selectLpStake", "selectSimpleStake", "selectSimpleStakeById", "selectPlanLp", "select"],
}



const rootReducer = {
  wallet: persistReducer(persistWalletConfig, walletReducer),
  contract: persistReducer(persistSelectWalletConfig, selectReducer)
}



const middleware = (getDefaultMiddleware: any) => getDefaultMiddleware({
  serializableCheck: false
});

export const store = configureStore({
  reducer: rootReducer,
  middleware
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch