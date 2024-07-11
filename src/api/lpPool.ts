"use server"
import { cookies } from "next/headers";
import { api, setAuthToken } from "@/lib/axios";
import toast from "react-hot-toast";


export const depositStakeLp = async (transFees: any, pid: any, amount: any, t: any) => {
    const token = cookies().get("token")?.value;
  
    try {
        setAuthToken(token)
        const response = await api.post("pool/deposit-lp-pool", {
            transactionId: t,
            pid: pid,
            amount: Number(amount),
            transactionIdForServiceFee: transFees
        })
        const data = await response.data
       
        return data

    }
    catch (error : any) {
        if (error.response.status === 500) {
            toast.error("try again , Server isseus")
        }
        console.log(error)
    }
}


export const withdrawStakeLp = async (pid : any, amount : any, t : any) => {
    const token = cookies().get("token")?.value;
    try {
        setAuthToken(token)
        const response = await api.post("pool/withdraw-lp-pool", {
            transactionId: t,
            pid: pid,
            amount: amount,
        })
        const data = await response.data

        return data

    }
    catch (error: any) {
        if (error.response.status === 500) {
            toast.error("try again , Server isseus")
        }

        console.log(error)
    }
}


