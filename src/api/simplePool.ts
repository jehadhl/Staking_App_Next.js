"use server"
import { api, setAuthToken } from "@/lib/axios";
import { cookies } from "next/headers";

export const depositStakeSimpleToken = async (transFees: any, pid: any, amount: any, t: any, txId: any) => {
    const token = cookies().get("token")?.value;
  
    try {
        setAuthToken(token)
        const response = await api.post("pool/deposit-simple-pool", {
            transactionId: t,
            pid: pid,
            amount: Number(amount),
            transactionIdForServiceFee: transFees,
            poolTransactionId: txId
        })
        const data = await response.data
       
        return data

    }
    catch (error) {
        console.log(error, "error")
    }
}


export const withdrawStakeSimpleToken = async (pid: any, amount: any, t: any , transactionId : any) => {  
    const token = cookies().get("token")?.value;
    try {
        setAuthToken(token)
        const response = await api.post("pool/withdraw-simple-pool", {
            transactionId: t,
            pid: pid,
            amount: Number(amount),
            poolTransactionId :transactionId
        })
        const data = await response.data

        return data

    }
    catch (error) {
        console.log(error , "error")
    }
}


