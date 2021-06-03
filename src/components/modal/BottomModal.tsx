import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './BottomModal.module.scss';
import classnames from 'classnames/bind';
import BasicButton from '../button/BasicButton';
import { Backdrop/*, ButtonBase*/ } from '@material-ui/core';

//action

interface Props{
    open : boolean,
    handleClose? : ()=>void
}

interface AgreeToggleProps{
    name : string,
    checked : boolean,
    onToggle? : ()=>void,
}
const cn = classnames.bind(styles);

const BottomModal = ({ open, handleClose }:Props) => {


    return (
        <>
            <div className={cn('bottom-modal', { on: open })}>
                <div className={styles['box']}>
                    <div className={styles['modal-title']}>
                        조건설정
                        <AgreeToggle name={"원룸"} checked={true}  />
                        <AgreeToggle name={"투룸"} checked={true} />
                        <AgreeToggle name={"오피스텔"} checked={true}  />
                        <AgreeToggle name={"복층"} checked={true}  />
                        <BasicButton name={"조건 설정하기"} disable={false} onClick={()=>{}} />
                    </div>
                </div>
            </div>
            <Backdrop open={open} className={styles['dim']}  onClick={handleClose}/>
        </>
    );
};

const AgreeToggle = ({ name, checked, onToggle } : AgreeToggleProps) => {
    return (
        <div className={styles['selector']}>
            <div className={styles['name']}>{name}</div>
            <div className={cn('toggle', { checked })} onClick={onToggle}>
                <div className={styles['box']}>
                    <div className={styles['switch']}></div>
                </div>
            </div>
        </div>
    );
};

export default BottomModal;
