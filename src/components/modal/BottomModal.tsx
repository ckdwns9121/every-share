import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './BottomModal.module.scss';
import classnames from 'classnames/bind';
import BasicButton from '../button/BasicButton';
import { Backdrop/*, ButtonBase*/ } from '@material-ui/core';
import { RootState } from '../../store';
import {setFilter} from '../../store/filter';

//action

interface Props{
    open : boolean,
    handleClose : ()=>void
}

interface AgreeToggleProps{
    name : string,
    checked : boolean,
    onToggle? : ()=>void,
}
const cn = classnames.bind(styles);

const BottomModal = ({ open, handleClose }:Props) => {


    const {oneroom,tworoom,op,duplex} = useSelector((state:RootState)=>state.filters)
    const dispatch = useDispatch();
    const [state,setState] = useState<any>({
        type1:true,type2:true,type3:true,type4:true,
    })

    const {type1,type2,type3,type4} = state;

    const handleSetting=()=>{
        dispatch(setFilter({type:'oneroom',value:type1}));
        dispatch(setFilter({type:'tworoom',value:type2}));
        dispatch(setFilter({type:'op',value:type3}));
        dispatch(setFilter({type:'duplex',value:type4}));
        const storageFilter ={
            oneroom:type1,tworoom:type2,op:type3,duplex:type4
        }

        localStorage.setItem('filter',JSON.stringify(storageFilter));
        handleClose();
    }

    useEffect(()=>{
        setState({
            type1:oneroom,
            type2:tworoom,
            type3:op,
            type4:duplex
        })
    },[open])


    return (
        <>
            <div className={cn('bottom-modal', { on: open })}>
            <div className={styles['swiper']}/>
                <div className={styles['box']}>
                    <div className={styles['modal-title']}>
                        조건설정
                        <AgreeToggle name={"원룸"} checked={type1}  onToggle={()=>{setState({...state,type1:!type1})}}/>
                        <AgreeToggle name={"투룸"} checked={type2} onToggle={()=>{setState({...state,type2:!type2})}}/>
                        <AgreeToggle name={"오피스텔"} checked={type3}  onToggle={()=>{setState({...state,type3:!type3})}}/>
                        <AgreeToggle name={"복층"} checked={type4}  onToggle={()=>{setState({...state,type4:!type4})}}/>
                        <BasicButton name={"조건 설정하기"} disable={false} onClick={handleSetting} />
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
