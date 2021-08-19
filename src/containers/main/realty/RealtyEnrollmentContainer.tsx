import styles from './RealtyEnrollmentContainer.module.scss';
import {Button} from '@material-ui/core';
import {RoutePaths} from '../../../core/utils/path';
import RealtyList from '../../../components/item/RealtyList';
import Layout from '../../../components/layout/Layout';
//hooks
import {useToken} from '../../../hooks/useStore';
import { useEffect ,useState} from 'react';
import {useHistory} from 'react-router-dom';

import useLoading from '../../../hooks/useLoading';

//api
import {requsetMyRealtyList} from '../../../api/realty';
//type
import {Realty} from '../../../types/Realty';


function RealtyEnrollmentContainer(){
    
    const history = useHistory();
    const access_token = useToken();
    const [realties, setRealties] = useState<Realty[]>([]);
    const {handleLoading} = useLoading();


    const callGetApiMyRealtyList = async()=>{
         try{
            if(access_token){
                handleLoading(true);
                const res = await requsetMyRealtyList(access_token);
                console.log(res);
                if(res?.data?.message==='success'){
                    setRealties(res.data.my_realties);
                }
                handleLoading(false);
            }
         }   
         catch(e){
             console.log(e);
             handleLoading(false);

         }
    }

    useEffect(()=>{
        callGetApiMyRealtyList();
    },[])

    useEffect(()=>{
        console.log(realties);
    },[realties])

    return(
        <Layout>
            <Button className={styles['enrollment-button']} onClick={()=>history.push(RoutePaths.main.realty.write)}>
                        매물 등록하기
                    </Button>
                    <div className={styles['list']}>
                    {realties &&
                    <RealtyList realties={realties}/>
                    }
                    </div>
        </Layout>
    )
}


export default RealtyEnrollmentContainer;