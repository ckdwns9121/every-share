import React from 'react';
import styles from './BasicButton.module.scss';
import cn from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';

const cx = cn.bind(styles);

/* 
    모든 페이지에서 동일하게 쓰는 기본 버튼
    button_name : 버튼 이름
    disable :활성여부
*/

interface Props{
    name:string,
    disable? : boolean,
    onClick: ()=> void | Promise<void>
    color ?: string
}


const BasicButton =({name ,disable, onClick,color} : Props)=>{
    return(
        <ButtonBase className={cx('basic-button',{disable},color)}  disableRipple={disable} onClick={!disable ? onClick : ()=>{}} >
            {name}
        </ButtonBase>
    )
}

export default BasicButton;

BasicButton.defaultProps={
    button_name :'button',
    disable :false,
}