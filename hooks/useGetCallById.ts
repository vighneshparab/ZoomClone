import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCallById=(id:string|string[])=>{
    const [call, setcall] = useState<Call>()
    const [isCallLoading, setisCallLoading] = useState(true)

    const client=useStreamVideoClient();

    useEffect(()=>{
        if(!client || !id) return;

        const loadCall=async()=>{
            const {calls}=await client.queryCalls({
                filter_conditions:{
                    id: id
                }
            })
            if(calls.length > 0){
                setcall(calls[0]);
            }
            setisCallLoading(false)
        }

        loadCall();
    },[client,id])
    return {call,isCallLoading};
}