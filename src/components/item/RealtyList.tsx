import styles from './RealtyList.module.scss';
import {ButtonBase} from '@material-ui/core';
import {Link} from 'react-router-dom';

//asset
import TEST_IMAGE from '../../static/image/test.png';

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

function RealtyItem (){

    return(
        <div className={styles['realty-item']}>
            <div className={styles['realty-img']}>

            </div>
            <div className={styles['realty-info']}>
                <div className={styles['realty-price']}>
                    월세 300/24
                </div>
            </div>
        </div>
    )
}

export default RealtyItem;