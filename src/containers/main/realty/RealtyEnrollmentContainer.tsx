import styles from './RealtyEnrollmentContainer.module.scss';
import {Button} from '@material-ui/core';
import {RoutePaths} from '../../../core/utils/path';
import RealtyList from '../../../components/item/RealtyList';

//hooks
import {useToken} from '../../../hooks/useStore';
import { useEffect ,useState} from 'react';
import {useHistory} from 'react-router-dom';


//api
import {requsetMyRealtyList} from '../../../api/realty';
//type
import {Realty} from '../../../types/Realty';

function RealtyEnrollmentContainer(){
    
    const history = useHistory();
    const access_token = useToken();
    const [realties, setRealties] = useState<Realty[]>([]);


    const callGetApiMyRealtyList = async()=>{
         try{
            if(access_token){
                const res = await requsetMyRealtyList(access_token);
                console.log(res);
                if(res?.data?.message==='success'){
                    setRealties(res.data.my_realties);
                }
            }
         }   
         catch(e){
             console.log(e);
         }
    }

    useEffect(()=>{
        callGetApiMyRealtyList();
    },[])

    useEffect(()=>{
        console.log(realties);
    },[realties])

    return(
        <div className={styles['container']}>
            <div className={styles['content']}>
                <Button className={styles['enrollment-button']} onClick={()=>history.push(RoutePaths.main.realty.write)}>
                    매물 등록하기
                </Button>
                <div className={styles['list']}>
                {realties &&
                <RealtyList realties={realties}/>
                 }
                </div>
            </div>
        </div>
    )
}


export default RealtyEnrollmentContainer;