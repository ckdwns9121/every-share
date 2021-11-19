/* 회원가입 완료 페이지 */

import styles from './SignupCompleteContainer.module.scss';

import { useHistory } from 'react-router-dom';
import { RoutePaths } from '../../core/utils/path';
import BasicButton from '../../components/button/BasicButton';
import COMPLETE from '../../static/svg/complete.svg';

function SignupCompleteContainer() {
  const history = useHistory();
  return (
    <>
      <div className={styles['container']}>
        <div className={styles['content']}>
          <div className={styles['flex-box']}>
            <div className={styles['image']}>
              <img src={COMPLETE} alt="complete" />
            </div>
            <div className={styles['main-text']}>가입을 축하합니다</div>
            <div className={styles['sub-text']}>회원가입이 완료되었습니다.</div>
          </div>
        </div>
      </div>
      <div className={styles['button']}>
        <BasicButton
          name={'매물보러가기'}
          onClick={() => history.push(RoutePaths.auth.signin)}
        />
      </div>
    </>
  );
}

export default SignupCompleteContainer;
