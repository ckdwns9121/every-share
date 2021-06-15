/* 마이 페이지 */

import styles from './MypageContainer.module.scss';

import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {Button} from '@material-ui/core';

function MyPageContainer(){

    const {user} = useSelector((state:RootState) => state.user);
    return(
        <div className={styles['container']}>
            <div className={styles['content']}>
                <p>이메일</p>
                <Button className={styles['box']}>
                    {user?.email}
                </Button>
                <p>이름</p>
                <Button className={styles['box']}>
                    {user?.name}
                </Button>
                <p>비밀번호</p>
                <Button className={styles['box']}>
                    <input type='password' value={user?.password.substring(0,8)} readOnly/>
                </Button>
                <p>휴대폰 번호</p>
                <Button className={styles['box']}>
                    {user?.phone_number}
                </Button>
        
            </div>
        </div>
    )
}


export default MyPageContainer;