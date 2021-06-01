
import {Button, ButtonBase} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import styles from './AddressList.module.scss';

interface Address{
    addr : string,
    jibun? : string,
    lat?: number,
    lng?: number,
    post_num ?: number
}
function AddressItem ({addr,jibun,lat,lng,post_num}:Address){
    return(
        <ButtonBase className={styles['item']}>
            <div className={styles['addr']}>
                    {addr}
            </div>
            <div className={styles['jibun']}>
                    {jibun}
            </div>
        </ButtonBase>
    )
}

export default AddressItem;