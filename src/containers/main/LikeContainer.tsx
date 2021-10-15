/* 찜한 매물 페이지 */
import { useState,useEffect } from 'react';
import styles from './LikeContainer.module.scss';
import RealtyList from '../../components/item/RealtyList';
import Layout from '../../components/layout/Layout';

//api
import {requestLikeList} from '../../api/like';

//hook
import {useToken} from '../../hooks/useStore';
import {useLoading} from '../../hooks/useAsset';
import useMessage from '../../hooks/useMessage';

//type
import {IRealty} from '../../types/Realty';


function LikeContainer(){

    const access_token = useToken();
    const {loading,handleLoading} = useLoading();
    const emptyMessage = useMessage();
    const [likes, setLikes] = useState<IRealty[] | null | any >(null);

    const callGetApiLikeList =async()=>{
        try{
            handleLoading(true);
            if(access_token){
                const res = await requestLikeList(access_token);
                if(res.status===200){
                    const data = res.data.likes;
                    let newState :any = [] ;
                    data.forEach( (item : any) => {
                            newState.push(item.realty);
                    });
                    setLikes(newState);
                }
            }
            handleLoading(false);
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        callGetApiLikeList();
    },[])
    return(
        <Layout>
            {likes && <RealtyList realties={likes} icon={'none'} msg={emptyMessage()}/>}
        </Layout>
    )
}

export default LikeContainer;