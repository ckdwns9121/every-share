import axios from 'axios';
import {RoutePaths as API_PATH} from '../core/utils/path';

export const requsetPostSignup = async (
    email: string,
    name: string | null,
    password: string,
    phone_number: number | string,
    agree_sms: boolean,
    agree_push: boolean,
    register_type: number
) => {
    try {
        const URL = API_PATH.url +'/users/signup';
        API_PATH
        const formdata ={
            email,
            name,
            password,
            phone_number,
            agree_sms,
            agree_push,
            register_type,
        }

        const res = axios.post(URL,formdata);
        return res;

    }
    catch (e) {
        console.log(e);
        return e;
    }
}

export const requestPostSignin =(email:string,password:string) =>{
    try{
        const URL = API_PATH.url +'/users/signin';

        const formdata={
            email,password,
        }
        const res = axios.post(URL,formdata);
        return res;
    }
    catch(e){

    }
}

export const  requestGetUser =async (access_token : string) =>{

    const URL = API_PATH.url +'/users';

    const config={
        headers:{
            'Authorization' :`Bearer ${access_token}`,
            'Content-Type' : 'application/json',
        }
    }
    return await axios.get(URL,config).then((res)=> res) .catch((e)=> e);
}