import React from 'react';
import styles from './AddressModal.module.scss';

//material
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import DialogContent from '@material-ui/core/DialogContent';
import {IconButton} from '@material-ui/core';


//hooks
import {useStyles} from '../../hooks/useStyles';
import { useHistory } from 'react-router';

//component
import Arrow from '../asset/Arrow';
import SEARCH from '../../static/svg/search-light.svg';
import AddressList from '../../components/address/AddressList';
//type
import {IAddress} from '../../types/Address';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddressModal({open,addr,onChange,list,onClick} :{
  open:boolean, 
  addr:string ,
  list: IAddress[] | null,
  onChange:(e : React.ChangeEvent<HTMLInputElement>)=>void
  onClick: (jibun : string) =>void;

}) {
  const classes = useStyles();
  const history = useHistory();

  return (
      <Dialog  
      fullScreen 
      open={open} 
      TransitionComponent={Transition}
      >
        <DialogContent className={classes.content} style={{padding:'0 20px'}}>
            <div className={styles['app-bar']}>
                <IconButton className={styles['back']} onClick={()=>history.goBack()}>
                      <Arrow/>
                </IconButton>
                <div className={styles['address-input']}>
                  <input className={styles['input']}type ="text" value={addr} onChange={onChange}placeholder={'지역, 지하철역, 학교검색'}/>
                </div>
                <IconButton className={styles['address-search']}>
                    <img src={SEARCH} alt="검색"/>
                </IconButton>
            </div>
            <div className={styles['address-list']}> 
              <AddressList list={list} onClick={onClick}/>
            </div>  
        </DialogContent>
      </Dialog>
 
  );
}