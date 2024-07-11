"use server"

import { api } from "@/lib/axios";


export const getSettings = async () => {
   try{
     const response = await api.get("settings")
     const data = await response.data

    return data

   } 
   catch (error) {
    console.log(error)
   }
}