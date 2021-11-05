import {Fragment} from 'react';
import styles from './SlideMenu.module.scss'
import cn from 'classnames/bind';

//components
import {ButtonBase,Icon,IconButton} from '@material-ui/core';


//svg
import TIME from '../../static/svg/side/time.svg'; //최근본방
import LIKE from '../../static/svg/side/like.svg'; //찜한매물
import CONTACT from '../../static/svg/side/contact.svg';
import ENROLLMENT from '../../static/svg/side/enrollment.svg';
import EVENT from '../../static/svg/side/event.svg';
import NOTICE from '../../static/svg/side/notice.svg';
import ANQ from '../../static/svg/side/anq.svg';
import QNA from '../../static/svg/side/qna.svg'; 
import PUSH from '../../static/svg/side/push.svg';
import SETTING from '../../static/svg/side/setting.svg';

//hooks
import {useHistory} from 'react-router-dom';
import {RoutePaths} from '../../core/utils/path';
import { useSelector } from 'react-redux';
import {RootState} from '../../store';

const cx = cn.bind(styles);

interface Props{
    open : boolean,
    handleClose: ()=>void
}

interface ItemProps {
    text : string,
    icon : string,
    onClick ?:()=>void,
}
interface MenuComponent {
    icon: string,
    text:string,
    path? : string,
    onClick :()=>void;
}

function SlideMenu ({open,handleClose} : Props){

    const history = useHistory();

    const {user} = useSelector((state:RootState) =>state.user);

    const SlideMenu : MenuComponent[] =[
        {
            text:'최근 본방',
            icon : TIME,
            onClick :  ()=> onClick(RoutePaths.main.index),
        },
        {
            text:'내가 찜한 매물',
            icon : LIKE,
            onClick :  ()=> onClick(RoutePaths.main.realty.like),
        },
        // {
        //     text:'내가 문의한 매물',
        //     icon : CONTACT,
        //     onClick :  ()=> onClick(RoutePaths.main.realty.contact),
        // },
        {
            text:'내가 등록한 매물',
            icon : ENROLLMENT,
            onClick :  ()=> onClick(RoutePaths.main.realty.enrollment),
        },
        // {
        //     text:'이벤트',
        //     icon : EVENT,
        //     onClick :  ()=> onClick(RoutePaths.main.event.index),
        // },
        // {
        //     text:'자주묻는 질문',
        //     icon : QNA,
        //     onClick :  ()=> onClick('/'),
        // },
        // {
        //     text:'공지사항',
        //     icon : NOTICE,
        //     onClick :  ()=> onClick('/'),
        // },
        // {
        //     text:'1:1 문의',
        //     icon : ANQ,
        //     onClick :  ()=> onClick('/'),
        // },
    
    ]

    const onClick = (path:string) =>{
        
        handleClose();
        setTimeout(()=>{
            history.push(path);
        },500)
    }
  
    const onClickUser =()=>{
        if(user){
            handleClose();
            setTimeout(()=>{
                history.push(RoutePaths.main.mypage.index);
            },500)
        }
        else{
            handleClose();
            setTimeout(()=>{
                history.push(RoutePaths.auth.index);
            },500)
        }
    }

    const onClickNotice =()=>{
        handleClose();
        setTimeout(()=>{
            history.push(RoutePaths.main.realty.notice);
        },500)
    }

    return(
        <Fragment>
            <div className={cx('slide-menu',{open})}>
                <div className={styles['wrapper']}>
                    <ButtonBase className={styles['user-profile']} onClick={onClickUser}>
                        <div className={styles['user-name']}>
                            {!user ? '로그인이 필요합니다' :
                                user?.name ===null ? `사용자${user.user_id}` : user?.name
                            }
                        </div>
                        <div className={styles['user-email']}>
                                {user?.email}
                        </div>
                    </ButtonBase>
                    <div className={styles['top-icon']}>
                            <IconButton className={styles['icon']} onClick={onClickNotice}>
                                <img src={PUSH}/>
                            </IconButton>
                            <IconButton className={styles['icon']}>
                                <img src={SETTING}/>
                            </IconButton>
                    </div>
                </div>
                <div className={styles['menu-list']}>
                    {SlideMenu.map((item : MenuComponent,index:number) => <SlideMenuItem icon={item.icon} text={item.text} onClick={item.onClick} key={index}/>)}
                </div>
            </div>
            <div className={cx('dim',{open})} onClick={handleClose}/>
        </Fragment>
    )
}

function SlideMenuItem ({text,icon,onClick} : ItemProps){
    return(
        <ButtonBase className={styles['menu-item']} onClick={onClick}>
            <div className={styles['icon']}>
                <img src={icon} alt={text}/>
            </div>
            <div className={styles['text']}>
                {text}
            </div>
        </ButtonBase>
    )
}

export default SlideMenu;