import axios from 'axios';
import makeFormData from '../core/lib/makeFormData';


export const requestContact = async(JWT_TOKEN:string , realty_id:string|number)=>{
    const URL = '/api/realty_contact/'+realty_id;
    const config={
        headers:{
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${JWT_TOKEN}`,
        }
    }
    const res = await axios.post(URL,{}, config);
    return res;

}

export const requestContactList = async(JWT_TOKEN:string) =>{
    const URL = '/api/realty_contact';
    const config={
        headers:{
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${JWT_TOKEN}`,
        }
    }
    const res = await axios.get(URL,config);
    return res;

}
