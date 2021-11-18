/* 비번 업데이트 페이지 */
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {RoutePaths} from '../../../core/utils/path';
import Layout from '../../../components/layout/Layout';
import BasicButton from '../../../components/button/BasicButton';
import styles from './UpdatePasswordContainer.module.scss';

function UpdatePasswordContainer(){
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    const history = useHistory();

    const handleClick = () => {
        history.push(RoutePaths.main.mypage.index);
    }

    return(
        <Layout>
            <div className={styles['wrapper']}>
                <div className={styles['input-box']}>
                    <input 
                        type='password' 
                        name="current-password" 
                        placeholder={"현재 비밀번호"}  
                        value ={currentPassword} 
                        onChange={(e)=> { setCurrentPassword(e.target.value) }}
                    />
                    <input 
                        type='password' 
                        name="new-password" 
                        placeholder={"새 비밀번호"}  
                        value ={newPassword} 
                        onChange={(e)=> { setNewPassword(e.target.value) }}
                    />
                    <input 
                        type='password' 
                        name="check-password" 
                        placeholder={"비밀번호 재확인"}  
                        value ={checkPassword} 
                        onChange={(e) => { setCheckPassword(e.target.value)}}
                    />
                    <div className={styles['alert']}>
                        <h3 className={styles['text']}>
                            비밀번호가 일치합니다.
                        </h3>
                        <h3 className={`${styles.text} ${styles.error}`}>
                            비밀번호가 일치하지 않습니다.
                        </h3>
                    </div>
                    
                </div>
                <div className={styles['button']}>
                    <BasicButton name={'변경'} onClick={handleClick}/>
                </div>

            </div>
        </Layout>
    )
}


export default UpdatePasswordContainer;