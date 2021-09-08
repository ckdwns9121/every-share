/* 마이 페이지 */

import styles from './MypageContainer.module.scss';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {Button} from '@material-ui/core';
import { useHistory } from 'react-router';
import { RoutePaths } from '../../../core/utils/path';


import {logout} from '../../../store/user';


function MyPageContainer(){

    const {user} = useSelector((state:RootState) => state.user);
    const history= useHistory();
    const dispatch = useDispatch();
    const onClickLogout=()=>{
        localStorage.removeItem('access_token');
        dispatch(logout());
        history.replace(RoutePaths.main.index);
    }
    return(
        <div className={styles['container']}>
            <div className={styles['content']}>
                <p>이메일</p>
                <Button className={styles['box']}>
                    {user?.email}
                </Button>
                <p>이름</p>
                <Button className={styles['box']} onClick={()=>history.push(RoutePaths.main.mypage.update.name)}>
                    {user?.name}
                </Button>
                <p>비밀번호</p>
                <Button className={styles['box']}  onClick={()=>history.push(RoutePaths.main.mypage.update.password)}>
                    <input type='password' value={user?.password.substring(0,8)} readOnly/>
                </Button>
                <p>휴대폰 번호</p>
                <Button className={styles['box']} onClick={()=>history.push(RoutePaths.main.mypage.update.phone_number)}>
                    {user?.phone_number}
                </Button>
            </div>
            <div className={styles['logout']}>
                <Button className={styles['logout-btn']} onClick={onClickLogout}>로그아웃</Button>
            </div>
        </div>
    )
}


export default MyPageContainer;