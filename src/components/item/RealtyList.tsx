import styles from './RealtyList.module.scss';
import {ButtonBase} from '@material-ui/core';
import {Link} from 'react-router-dom';

//asset
import TEST_IMAGE from '../../static/image/test.png';
import { RoutePaths } from '../../core/utils/path';

interface Props{
    background? : string,
    realty_name?: string,
    deposit?:number | string,
    monthly_rent?:number | string,
    oper_start_time : string,
    oper_end_time : string,
    like ? :boolean
    contact? : boolean,
    delete ?: boolean,
}

function RealtyItemList (){
    return(
        <>  
        <RealtyItem/>
        <RealtyItem/>
        <RealtyItem/>
        <RealtyItem/>
        </>
    )
}

function RealtyItem (){

    return(
        <Link to ={`${RoutePaths.main.detail}/1`}>
            <div className={styles['realty-item']}>
            <div className={styles['realty-img']}>
                    <img src ={TEST_IMAGE}/>
            </div>
            <div className={styles['realty-info']}>
                <div className={styles['realty-price']}>
                    월세 300/24
                </div>
                <div className={styles['realty-name']}>
                    하단 에덴빌라
                </div>
                <div className={styles['realty-date']}>
                   2021-06-02 ~ 2021-08-02까지
                </div>
                <div className={styles['realty-comment']}>
                   방학때 본가에 가게 됐어요 ....😂
                </div>
            </div>
        </div>
    </Link>

    )
}

export default RealtyItemList;