
import {Button, ButtonBase} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import styles from './AddressList.module.scss';
import {Address} from '../../types/Address';


interface Props{
    list : Address[]| null
}


function AddressItemList({list} : Props){

    const address_list = list?.map((item) =>
    <AddressItem key ={item.jibunAddr}jibunAddr={item.jibunAddr} roadAddr ={item.roadAddr} siNm={item.siNm} zipNo={item.zipNo}/>
    )
    return(
        <>
        {address_list}
            {/* <AddressItem addr={'동아대학교 승학캠퍼스'} jibun={'낙동대로 515번길 49'}/> */}
            {/* <AddressItem addr={'동아대학교 승학캠퍼스'} jibun={'낙동대로 515번길 49'}/> */}
            {/* <AddressItem addr={'동아대학교 승학캠퍼스'} jibun={'낙동대로 515번길 49'}/> */}
            {/* <AddressItem addr={'동아대학교 승학캠퍼스'} jibun={'낙동대로 515번길 49'}/> */}
            {/* <AddressItem addr={'동아대학교 승학캠퍼스'} jibun={'낙동대로 515번길 49'}/> */}
        </>
    )
}
function AddressItem ({ jibunAddr,roadAddr,siNm,zipNo}:Address){
    return(
        <ButtonBase className={styles['item']}>
            <div className={styles['addr']}>
                    {jibunAddr}
            </div>
            <div className={styles['jibun']}>
                    {roadAddr}
            </div>
        </ButtonBase>
    )
}

export default AddressItemList;