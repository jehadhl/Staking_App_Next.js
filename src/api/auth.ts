'use server';

import { api } from "@/lib/axios";
import { resSucssesFormat, resErrorFormat } from "@/utils/helpers";


export const getNonce = async (address: string) => {
  try {
    if (address) {
      const response = await api.post("auth/nonce", {
        publicAddress: address
      })
  
      return resSucssesFormat(response?.data)
    }
  }
  catch (error: any) {
    return resErrorFormat(error?.response)
  }
}


export const registerWallet = async (address: string, signature: string) => {
  try {
    if (address && signature) {
      const response = await api.post("auth/register", {
        publicAddress: address,
        signature,
      })

      return resSucssesFormat(response?.data)
    }
  }
  catch (error: any) {
    return resErrorFormat(error?.response)
  }
}