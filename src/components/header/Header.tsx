
import {useRef , useEffect, useState} from 'react';
import styles from './Header.module.scss';
import cn from 'classnames/bind';
import {useHistory,useLocation} from 'react-router';
import {RoutePaths} from '../../core/utils/path';
import Arrow from '../asset/Arrow';
import {IconButton} from '@material-ui/core';

const cx = cn.bind(styles);

interface Props{
    title?:string
    children?: JSX.Element
}

function Header({title,children}:Props){
    
    const history = useHistory();
    const headerRef = useRef<HTMLDivElement | null>(null);
    const [shadow, setShadow] = useState(false);

    useEffect(() => {
        if(headerRef.current){
            const headerHeight = headerRef.current.getBoundingClientRect().height;
            const headerControll = () => setShadow(window.scrollY > headerHeight);
            window.addEventListener('scroll', headerControll);
            return () => window.removeEventListener('scroll', headerControll);
        }
    }, []);

  
    return(
        <div className={styles['header']} ref={headerRef}>
        <div className={cx('content', { shadow })}>
            <IconButton
                className={styles['back-btn']}
                onClick={() =>{
                    console.log('back');
                    history.goBack()
                }}
            >
                <Arrow />
            </IconButton>
            {children}
            <div className={styles['title']}>{title}</div>
        </div>
    </div>
    )
}


export default Header;