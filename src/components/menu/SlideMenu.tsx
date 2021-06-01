import {Fragment, ReactNode} from 'react';
import styles from './SlideMenu.module.scss'
import cn from 'classnames/bind';
import {ButtonBase,IconButton} from '@material-ui/core';

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

const cx = cn.bind(styles);

interface Props{
    open : boolean,
    handleClose?: ()=>void
}

interface ItemProps {
    text : string,
    icon : string,
    onClick ?:()=>void,
}

function SlideMenu ({open,handleClose} : Props){
    return(
        <Fragment>
            <div className={cx('slide-menu',{open})}>
                <div className={styles['wrapper']}>
                    <ButtonBase className={styles['user-profile']}>
                        <div className={styles['user-name']}>
                                박창준
                        </div>
                        <div className={styles['user-email']}>
                                ckdwns9121@naver.com
                        </div>
                    </ButtonBase>
                    <div className={styles['top-icon']}>
                            <IconButton className={styles['icon']}>
                                <img src={PUSH}/>
                            </IconButton>
                            <IconButton className={styles['icon']}>
                                <img src={SETTING}/>
                            </IconButton>
                    </div>
                </div>
                <div className={styles['menu-list']}>
                    <SlideMenuItem icon={TIME} text ={"최근 본방"}/>
                    <SlideMenuItem icon={LIKE} text ={"좋아요한 매물"}/>
                    <SlideMenuItem icon={CONTACT} text ={"내가 문의한 매물"}/>
                    <SlideMenuItem icon={ENROLLMENT} text ={"내가 등록한 매물"}/>
                    <SlideMenuItem icon={EVENT} text ={"이벤트"}/>
                    <SlideMenuItem icon={ANQ} text ={"자주묻는 질문"}/>
                    <SlideMenuItem icon={NOTICE} text ={"공지사항"}/>
                    <SlideMenuItem icon={QNA} text ={"1:1 문의"}/>

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