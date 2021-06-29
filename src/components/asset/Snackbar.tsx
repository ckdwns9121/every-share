import React from 'react';
import { Snackbar, Slide,SlideProps  } from '@material-ui/core';
import cn from 'classnames/bind';
import styles from './Snackbar.module.scss';

const cx = cn.bind(styles);
type TransitionProps = Omit<SlideProps, 'direction'>;

const TransitionLeft = (props : TransitionProps) => {
    return <Slide {...props} direction="left" />;
};

function SnackBar (){
    return (
        <Snackbar
            className={cx('snackbar', 'default', { up:false })}
            open={true}
            autoHideDuration={6000}
            TransitionComponent={TransitionLeft}
            message={'hello'}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
