import styles from './RealtyList.module.scss';
import {ButtonBase, IconButton} from '@material-ui/core';
import {Link} from 'react-router-dom';

//asset
import TEST_IMAGE from '../../static/image/test.png';
import { RoutePaths } from '../../core/utils/path';
import Like from '../asset/Like';
import Empty from '../asset/Empty';

//type
import {Realty} from '../../types/Realty';

import {dateToYYYYMMDD,imageFormat} from '../../core/lib/formatChecker';


interface Relties{
    realties? : Realty[];
    like ? :boolean,
    enrollment?:boolean,
    contact?:boolean,
}

interface Props extends Realty{
    like ? :boolean,
    enrollment?:boolean,
    contact?:boolean,
}

function RealtyItemList ({realties,like} : Relties){

    const list = realties?.map((item)=> <RealtyItem {...item} key={item.realty_id} like={like}/>)
    return(
        <>  
        {list?.length!==0 ? list : <Empty></Empty>}
        </>
    )
}

function RealtyItem (props: Props){

    console.log(props.realty_images);
    const sumbnail = JSON.parse(props.realty_images)
    console.log(sumbnail);
    return(
        <Link to ={`${RoutePaths.main.detail}/${props.realty_id}`}>
            <div className={styles['realty-item']}>
            <div className={styles['realty-img']}
            
            style={{
                backgroundImage: `url(${imageFormat(
                    sumbnail[0]
                )})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            >
            {/* <img src ={TEST_IMAGE} style={{'position':'relative'}}/> */}
            
            { (props.isLiked && props.like) &&
            <div className={styles['like']}>
                 <Like on={true} onClick={()=>{}}/>
            </div>
             }
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