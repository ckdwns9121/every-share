import axios from 'axios';
import {RoutePaths as API_PATH} from '../core/utils/path';


export const requsetPostSignup = async (
    email: string,
    name: string | null,
    password: string,
    phone_number: number | string,
    agree_sms: boolean,
    agree_push: boolean,
    register_type: number | null
) => {
        const URL = '/api/users/signup';
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

export const requestPostSignin =(email:string,password:string) =>{
        const URL ='/api/users/signin';

        const formdata={
            email,password,
        }
        const res = axios.post(URL,formdata);
        return res;

}

export const  requestGetUser =async (access_token : string) =>{
    const URL = '/api/users';
    const config={
        headers:{
            'Authorization' :`Bearer ${access_token}`,
            'Content-Type' : 'application/json',
        }
    }
    return await axios.get(URL,config).then((res)=> res) .catch((e)=> e);
}