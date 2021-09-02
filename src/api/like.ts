import axios from 'axios';
import {RoutePaths as API_PATH} from '../core/utils/path';


export const requestLike =async(realty_id:number | string, token:string)=>{
    const URL = '/api/like/'+realty_id;
    const config={
        headers:{
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }
    const res = await axios.post(URL,{}, config);
    return res;
}