import styles from './Like.module.scss';
import cn from 'classnames/bind';
import {IconButton} from '@material-ui/core';

const cx = cn.bind(styles);
interface Props{
    on : boolean
    onClick: () => void | Promise<void>;
}
function Like({on,onClick}:Props) {


  return (
    <IconButton className={styles['like-button']} onClick={onClick}>
      {/* <div className={styles['stage']}>
        <div className={cx('heart',{on})}/>
      </div> */}
      <svg
        width="17.257"
        height="16.145"
        viewBox="0 0 17.257 16.145"
       className={styles['like']}
      >
        <path
          id="iconmonstr-favorite-3"
          d="M8.128,3.2C6-.459,0,.609,0,5.194,0,8.351,3.774,11.58,8.128,15.9c4.355-4.322,8.128-7.551,8.128-10.708C16.257.594,10.245-.432,8.128,3.2Z"
          transform="translate(0.5 -0.461)"
          fill={on ? '#F13B4D' : "none"}
          stroke={on? 'none' : '#4b4d54'}
          strokeWidth="1"
        />
      </svg>
    </IconButton>

  );
}

export default Like;
