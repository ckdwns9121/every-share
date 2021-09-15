
import {Button, ButtonBase} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import styles from './AddressList.module.scss';


export interface Address{
    jibunAddr: string,
    roadAddr: string,
    siNm?: string,
    zipNo?: string
    onClick: (jibun : string) =>void | Promise<void>;
}


interface Props{
    list : Address[]| null
    onClick: (jibun : string) =>void;
}


function AddressItemList({list,onClick} : Props){

    const address_list = list?.map((item) =>
    <AddressItem key ={item.jibunAddr}jibunAddr={item.jibunAddr} onClick={onClick} roadAddr ={item.roadAddr} siNm={item.siNm} zipNo={item.zipNo}/>
    )
    return(
        <>
        {address_list}
        </>
    )
}
function AddressItem ({ jibunAddr,roadAddr,siNm,zipNo,onClick}:Address){

    const test =(e : any)=>{
        onClick(jibunAddr);
    }
    return(
        <ButtonBase className={styles['item']} onClick={test}>
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