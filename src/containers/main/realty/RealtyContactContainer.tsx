import styles from './RealtyEnrollmentContainer.module.scss';
import Layout from "../../../components/layout/Layout";
import {RoutePaths} from '../../../core/utils/path';
import RealtyList from '../../../components/item/RealtyList';
//hooks
import {useToken} from '../../../hooks/useStore';
import { useEffect ,useState} from 'react';
import {useHistory} from 'react-router-dom';

import {useLoading} from '../../../hooks/useAsset';

//api
import {requestContactList} from '../../../api/contact';
//type
import {IRealty} from '../../../types/Realty';


function RealtyContactContainer(){
    const history = useHistory();
    const access_token = useToken();
    const [realties, setRealties] = useState<IRealty[]>([]);
    const {handleLoading} = useLoading();

    const callGetMyContactList = async()=>{
        try{
            if(access_token){
                handleLoading(true);
                const res= await requestContactList(access_token);
                if(res?.status===200){
                    const data= res.data.contacts;
                    let newState : any =[];
                    data.forEach((item:any)=>{
                        newState.push(item.realty);
                    })
                    setRealties(newState);
                }
                handleLoading(false);
            }
        }
        catch(e){

        }
    }

    useEffect(()=>{
        callGetMyContactList();
    },[])
    return(
        <Layout>
                      <div className={styles['list']}>
                    {realties &&
                    <RealtyList realties={realties} icon={'contact'}/>
                    }
                    </div>
        </Layout>
    )
}


export default RealtyContactContainer;