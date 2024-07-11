import { IResponse } from '@/utils/types'
import toast from "react-hot-toast";
import {  store } from "@/redux/store";
import { cancelSignModal, signOut } from '@/redux/slices/walletSlice';
import Cookies from 'js-cookie';

// export function apiErrorHandler(
//     statusCode: number,
//     tostr: boolean,
//     error?: any,
// ) {
//     console.log("error signnnnnnnnnn")
//     if (statusCode === 403 || statusCode === 401) {
//         store.dispatch(signOut());
//         store.dispatch(cancelSignModal(false))
//         toast.error("try again");
//     }


//     if (!tostr && error?.message === "failed") {
//         store.dispatch(signOut());
//         store.dispatch(cancelSignModal(false))
//         toast.error(error?.error[0]);
//     }
//     return;
// }


export function resSucssesFormat(res: IResponse) {
    return {
        isSuccess: true,
        message: res?.message || undefined,
        data: res?.data,
        statusCode: res?.statusCode,
        status: res?.status || undefined,
    };
}

export function resErrorFormat(error: IResponse) {
    return {
        isSuccess: false,
        data: error?.data,
        statusCode: error?.data?.statusCode,
        status: error?.data?.status || undefined,
        errorCode: error?.data?.errorCode || null,
        message: error?.data?.message || ""
    };
}

export const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };


export const setUserToken = (value: string, options: any) => {
   
    Cookies.set("token", value);
};

