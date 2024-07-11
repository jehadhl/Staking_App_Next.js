import { api, setAuthToken } from '@/lib/axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { signOut } from '@/redux/slices/walletSlice';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hook';

const useHistory = (currentPage: number,
    itemsPerPage: number, active: string, type: string) => {
    const [history, setHistory] = useState<any>([])
    const [loadingHistory, setLoadingHistory] = useState(false)
    const [errorHistory, setErrorHistory] = useState<string>("")
    const dispatch = useDispatch()
    const router = useRouter()
    const { did } = useAppSelector(state => state.contract.selectSimpleStake)
    const getHistory = async () => {
        const token = Cookies.get('token');
        setAuthToken(token);
        let response;
        try {
            setLoadingHistory(true)
            if (type === "token") {
                response = await api.get(`pool/history/${type}?page=${currentPage}&perPage=${itemsPerPage}&poolId=${did}`)
            }
            else {
                response = await api.get(`pool/history/${type}?page=${currentPage}&perPage=${itemsPerPage}`)
            }
            const data = await response.data
            setHistory(data)
            setLoadingHistory(false)
        }
        catch (error: any) {
            setErrorHistory("Data Not Found")
            if (error && error.response && error.response.status === 403) {
                dispatch(signOut())
                router.push('/');
            }
        }
    }


    useEffect(() => {
        if (active === "history") {
            getHistory()
        }
    }, [currentPage, itemsPerPage, active])


    return {
        history,
        loadingHistory,
        errorHistory
    }


}

export default useHistory