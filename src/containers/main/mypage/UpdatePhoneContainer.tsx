/* 핸드폰 번호 업데이트 페이지 */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RoutePaths } from '../../../core/utils/path';
import Layout from '../../../components/layout/Layout';
import BasicButtonSmall from '../../../components/button/BasicButtonSmall';
import BasicButton from '../../../components/button/BasicButton';

import styles from './UpdatePhoneContainer.module.scss';

function UpdatePhoneContainer(){
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [authNumber, setAuthNumber] = useState<string>();

    const history = useHistory();

    const handleClickSmallButton = () => {}

    return(
        <Layout>
            <div className={styles['wrapper']}>
                <div className={styles['input-container']}>
                    <div className={styles['input-box']}>
                        <input
                            type='text'
                            name='phone-number'
                            placeholder={"ex) 01012341234"}
                            value ={phoneNumber} 
                            onChange={(e)=> { setPhoneNumber(e.target.value) }}
                        />
                        <div className={styles['button']}>
                            <BasicButtonSmall name={'인증번호 재발송'} disable={true} onClick={handleClickSmallButton}/>
                        </div>
                    </div>
                    <div className={styles['input-box']}>
                        <input
                            type='text'
                            name='auth-number'
                            placeholder={"인증번호를 입력하세요"}
                            value ={authNumber} 
                            onChange={(e)=> { setAuthNumber(e.target.value) }}
                        />
                        <div className={styles['button']}>
                            <BasicButtonSmall name={'인증하기'} onClick={handleClickSmallButton}/>
                        </div>
                    </div>
                </div>
                <div className={styles['button']}>
                    <BasicButton name={'변경'} onClick={()=>history.push(RoutePaths.main.mypage.index)}/>
                </div>
            </div>
        </Layout>
    )
}


export default UpdatePhoneContainer;