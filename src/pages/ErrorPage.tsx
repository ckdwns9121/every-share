import {useEffect,Fragment} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import Header from '../components/header/Header';
import styles from './Error.module.scss';
import ERROR from '../static/svg/error.svg';
import BasicButton from '../components/button/BasicButton';

function ErrorPage (){
    const history = useHistory();
    return(
    <Fragment>
        <Header title={'오류안내'}/>
          <div className={styles['container']}>
              <div className={styles['content']}>
                    <div className={styles['flex-box']}>
                        <div className={styles['image']}>
                            <img src={ERROR}/>
                        </div>
                        <div className={styles['error-code']}>
                                에러코드 (404)
                        </div>
                        <div className={styles['error-text']}>
                                페이지를 찾을 수 없습니다.
                        </div>
                    </div>
              </div>
         </div>
         <div className={styles['button']}>
         <BasicButton name={'이전페이지'} onClick={()=>history.goBack()}/>
         </div>
    </Fragment>
  
    )

}
export default ErrorPage