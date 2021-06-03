
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

function AddressItemList(){
    return(
        <>
            <AddressItem addr={'동아대학교 승학캠퍼스'} jibun={'낙동대로 515번길 49'}/>
            <AddressItem addr={'동아대학교 승학캠퍼스'} jibun={'낙동대로 515번길 49'}/>
            <AddressItem addr={'동아대학교 승학캠퍼스'} jibun={'낙동대로 515번길 49'}/>
            <AddressItem addr={'동아대학교 승학캠퍼스'} jibun={'낙동대로 515번길 49'}/>
            <AddressItem addr={'동아대학교 승학캠퍼스'} jibun={'낙동대로 515번길 49'}/>
        </>
    )
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

export default AddressItemList;