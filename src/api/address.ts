import axios from 'axios';


const URL = 'https://www.juso.go.kr/addrlink/addrLinkApi.do';
const KEY = 'devU01TX0FVVEgyMDIxMDkxNDEzMTcyNjExMTY2Mjk=';


export const searchAddress = async (searchAddr : string) => {

    const req = URL;
    const config ={
        params:{
            confmKey : KEY,
            currentPage:1,
            countPerPage:10,
            keyword:searchAddr,
            resultType:'json'
        },
        headers:{
           Accept: "application/json, text/plain, */*",
        }
    }

    console.log(searchAddr)
    const res = await axios.get(req,config);
    console.log(res);

    return res.data.results.juso;

};


export const requsetGetAreaInfo = async (lat: number, lng : number) => {
    const URL = 'https://dapi.kakao.com/v2/local/geo/coord2address.json';
    const response = await axios.get(URL, {
        headers: {
            Authorization: `KakaoAK 1de08c4477f5c00ee658b1e9ff17b6a6`,
        },
        params: {
            y: lat,
            x: lng,
        },
    });
    return response;
};

export const requestGetAddressInfo = async (address : string) => {
    const URL = 'https://dapi.kakao.com/v2/local/search/address.json';
    const response = await axios.get(URL, {
        headers: {
            Authorization: `KakaoAK 1de08c4477f5c00ee658b1e9ff17b6a6`
        },
        params: {
            query: address,
        },
    });
    return response;
};
