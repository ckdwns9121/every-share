import { useEffect } from "react";
import {requestGetNotice} from '../../../api/contact';
import {requestRealtyLately} from '../../../api/realty';
import { useToken } from "../../../hooks/useStore";

const ReatlyNoticeContainer =()=>{


    const access_token = useToken();
    const getCallNotice = async ()=>{
        try{
            if(access_token){
                const res = await requestRealtyLately([1],access_token);
                console.log(res);
            }
        }
        catch(e){

        }
    }


    useEffect(()=>{
        getCallNotice();
    },[])

    
    return(
        <div>
                ㅎㅇㅎㅇ
        </div>
    )
}

export default ReatlyNoticeContainer;