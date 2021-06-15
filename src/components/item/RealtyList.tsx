import styles from './RealtyList.module.scss';
import {ButtonBase} from '@material-ui/core';
import {Link} from 'react-router-dom';

//asset
import TEST_IMAGE from '../../static/image/test.png';
import { RoutePaths } from '../../core/utils/path';

//type
import {Realty} from '../../types/Realty';

import {dateToYYYYMMDD} from '../../core/lib/formatChecker';


interface Relties{
    realties? : Realty[];
}

interface Props extends Realty{
    like ? :boolean,
    enrollment?:boolean,
    contact?:boolean,
}

function RealtyItemList ({realties} : Relties){

    const list = realties?.map((item)=> <RealtyItem {...item} key={item.realty_id}/>)
    console.log(list);
    return(
        <>  
        {list}
        </>
    )
}

function RealtyItem (props: Props){

    return(
        <Link to ={`${RoutePaths.main.detail}/${props.realty_id}`}>
            <div className={styles['realty-item']}>
            <div className={styles['realty-img']}>
                    <img src ={TEST_IMAGE}/>
            </div>
            <div className={styles['realty-info']}>
                <div className={styles['realty-price']}>
                    월세 {`${props.deposit}/${props.monthly_rent}`}
                </div>
                <div className={styles['realty-name']}>
                    {props.realty_name}
                </div>
                <div className={styles['realty-date']}>
                {`${dateToYYYYMMDD(new Date(props.oper_start_time))}`} ~   {`${dateToYYYYMMDD(new Date(props.oper_end_time))}`}까지
                </div>
                <div className={styles['realty-comment']}>
                   {props.realty_comment}
                </div>
            </div>
        </div>
    </Link>

    )
}

export default RealtyItemList;