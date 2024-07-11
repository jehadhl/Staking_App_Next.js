import { getSettings } from "@/api/settings";
import { useAppSelector } from "@/redux/hook";
import { setNetwork } from "@/redux/slices/walletSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";


export const useSelectToken = () => {
  const [dataSelectToken, setDataSelectToken] = useState<any | {}>([])
  const [adderssContract, setAddressContract] = useState<string | any>("")
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState<string>("")
  const dispatch = useDispatch()
  const { select } = useAppSelector((state) => state.contract)

  
  const getData = async (): Promise<void> => {
    try {
      setLoading(true)
      const data = await getSettings()
      dispatch(setNetwork({ chainId: data?.data?.chainId, name: "sepolia" }))
      setDataSelectToken(data)

      if (select === "lpStakingContract" || select === "") {
        setActive(data.data.plans[0].tag)
        setAddressContract(data?.data?.lpStakingContractAddress)
      }
      else {
        setActive(data.data.plans[1].tag)
        setAddressContract(data?.data?.simpleStakingContractAddress)
      }

      setLoading(false)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])


  return {
    dataSelectToken,
    loading,
    setActive,
    adderssContract,
    active,
    setAddressContract
  }
}



