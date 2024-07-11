import { api, setAuthToken } from "@/lib/axios";
import Cookies from "js-cookie";

export const claimReward = async (t: any, typeToken: any, did: any) => {
    const token = Cookies.get("token")
    try {
        setAuthToken(token)

        const response = await api.post("claim", {
            transactionId: t,
            type: typeToken,
            pid: did
        })
        const data = await response.data

        return data

    }
    catch (error) {
        console.log(error, "error")
    }
}


