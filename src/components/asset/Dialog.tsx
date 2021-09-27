import styles from './Dialog.module.scss';
import Backdrop from '@material-ui/core/Backdrop';
import cn from 'classnames/bind';
import { makeStyles } from '@material-ui/core/styles';
import {ButtonBase} from '@material-ui/core';

import { useSelector,useDispatch } from 'react-redux';
import { offDialog } from '../../store/dialog';
import { RootState } from '../../store';

const cx = cn.bind(styles);

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: 9999,
      color: '#fff',
    },
}));
  
function Dialog(){
  const classes = useStyles();
  const dispatch = useDispatch();
  const {open,title,message,isConfirm,onClick,onClose} = useSelector((state:RootState) =>state.dialog);

  const handleClose=()=>{
    dispatch(offDialog());
  }

    return(
        <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <div className={styles['dialog']}>
          <div className={styles['wrapper']}>
              <div className={styles['title']}>
                  {title}
              </div>
              <div className={styles['message']}>
                  {message}
              </div>
          </div>
          <div className={styles['button']}>
              <ButtonBase className={cx('btn','yes')} onClick={onClick}>
                  {isConfirm ? '예' :'확인'}
                </ButtonBase>
              {isConfirm &&
              <ButtonBase className={cx('btn','cancel')} onClick={handleClose}>아니오</ButtonBase>
               }
          </div>
        </div>
        </Backdrop>
    
  
    )
}

export default Dialog;