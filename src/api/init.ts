import axios from 'axios';

export const cancleToken=()=>{
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    return source;
}

export const customAxiosInstance=()=>{
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:4000',
        timeout:5000,
        withCredentials:true
    });

    // HTTP status가 2xx일 때 처리하고 싶은 로직이 있으면 onFulfilled에서 처리
    const onFulfilled = (res: any)=> res;

    // response에 에러가 있을 시.
    const onRejected =(error :any)=>{
        if(error.config){
            console.log(error.config);
            return retry(error.config);
        }
        return Promise.reject(error);
    }

    //재시도.
    const retry =(errorConfig : any) =>{
        return new Promise ((resolve:any) =>{
            setTimeout(()=>{
                console.log('retry');
                resolve(axiosInstance.request(errorConfig));
            },5000);
        })
    }

    //요청전 수행할 일.
    const requestPrev =(config : any)=>{
        console.log('요청 전');
        const access_token = localStorage.getItem('access_token');
        if(access_token){
            config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;
    }

    //요청전 에러가 있다.
    const requestError = (e : any)=>{
        console.log('오류 요청 전 수행할 일');
        console.log(e);
        return Promise.reject(e);
    }

    axiosInstance.interceptors.request.use(requestPrev,requestError);
    axiosInstance.interceptors.response.use(onFulfilled,onRejected);
    return axiosInstance;
}
