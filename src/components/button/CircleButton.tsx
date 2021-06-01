
import styles from './CircleButton.module.scss';
import { IconButton } from '@material-ui/core';

interface Props {
    src : string,
    onClick? : ()=>void,
}

function CircleButton ({src,onClick} : Props){
    return(
        <div className={styles['btn']}>
        <IconButton className={styles['circle-btn']} onClick={onClick}>
            <img src={src} alt="alt" />
        </IconButton>
    </div>
    )
}

export default CircleButton;