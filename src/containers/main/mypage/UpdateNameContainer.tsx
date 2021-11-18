/* 이름 업데이트 페이지 */
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {RoutePaths} from '../../../core/utils/path';
import Layout from '../../../components/layout/Layout';
import BasicButton from '../../../components/button/BasicButton';
import styles from './UpdateNameContainer.module.scss';


function UpdateNameContainer(){
    const [name, setName] = useState('');

    const history = useHistory();

    return(
        <Layout>
            <div className={styles['wrapper']}>
                <div className={styles['input-box']}>
                    <input 
                        type='text' 
                        name="email" 
                        placeholder={"이름을 입력해주세요"}  
                        value ={name} 
                        onChange={(e)=> { setName(e.target.value) }}
                    />
                </div>
                <div className={styles['button']}>
                    <BasicButton name={'변경'} onClick={()=>history.push(RoutePaths.main.mypage.index)}/>
                </div>

            </div>
        </Layout>
    )
}


export default UpdateNameContainer;