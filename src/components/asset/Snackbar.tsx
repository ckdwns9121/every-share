import React from 'react';
import { Snackbar, Slide,SlideProps  } from '@material-ui/core';
import cn from 'classnames/bind';
import styles from './Snackbar.module.scss';
import { useSelector } from 'react-redux';
import {RootState} from '../../store';

const cx = cn.bind(styles);
type TransitionProps = Omit<SlideProps, 'direction'>;

const TransitionLeft = (props : TransitionProps) => {
    return <Slide {...props} direction="up" />;
};


function SnackBar (){
    const {message,open,up,variant} =  useSelector((state:RootState) =>state.snackbar);
    return (
        <Snackbar
            className={cx('snackbar', variant, { up })}
            open={open}
            autoHideDuration={6000}
            TransitionComponent={TransitionLeft}
            message={message}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
    );
};

SnackBar.defaultProps = {
    open: false,
    message: '',
    variant: 'default',
    up: false,
};

export default SnackBar;
