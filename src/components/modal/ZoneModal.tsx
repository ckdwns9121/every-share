import React from 'react';
import styles from './ZoneModal.module.scss';

//material
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import DialogContent from '@material-ui/core/DialogContent';


//hooks
import {useStyles} from '../../hooks/useStyles';
import { useHistory } from 'react-router';

//component
import Header from '../../components/header/Header';
//type
import {IRealty} from '../../types/Realty';
import RealtyItemList from '../item/RealtyList';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ZoneModal({open,realties} :{
  open:boolean, 
  realties:IRealty[]
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
            <Header title={`이지역 매물 ${realties.length}개 보기`}></Header>
            <div className={styles['list']}> 
                    <RealtyItemList  realties={realties} like ={true}></RealtyItemList>
            </div>  
        </DialogContent>
      </Dialog>
 
  );
}