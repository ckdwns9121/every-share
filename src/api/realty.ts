import axios from 'axios';



export const requestGetRealty = async(lat:number , lng :number , filter :Array<number>)=>{
    const URL = '/api/realty';

    const config={
        headers:{
            'Content-Type' : 'application/json',
        }
    }
    const params = {
        lat,
        lng,
        filter
    };
    const res = await axios.get(URL, { params });
    return res;
}