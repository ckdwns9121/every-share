/* 이메일 / 비번 찾기 페이지 */
import styles from './FindContainer.module.scss';
import EMAIL from '../../../static/svg/auth/find_email.svg';
import PASSWORD from '../../../static/svg/auth/find_password.svg';

import {Link} from 'react-router-dom';
import {RoutePaths} from '../../../core/utils/path'


function FindContainer(){
    return (
      <div className={styles["container"]}>
        <div className={styles["content"]}>
          <Link to={RoutePaths.auth.find.email}>
            <div className={styles["box"]}>
              <div className={styles["title"]}>아이디 찾기</div>
              <div className={styles["text"]}>휴대폰 인증을 <br/>통하여 아이디를 찾습니다.</div>
              <div className={styles["icon"]}><img src={EMAIL} alt="아이디찾기"></img></div>
            </div>
          </Link>

          <Link to={RoutePaths.auth.find.email}>
            <div className={styles["box"]}>
              <div className={styles["title"]}>비밀번호 찾기</div>
              <div className={styles["text"]}>휴대폰 인증을 <br/>통하여 아이디를 찾습니다.</div>
              <div className={styles["icon"]}><img src={PASSWORD} alt="비밀번호"></img></div>
            </div>
          </Link>
        </div>
      </div>
    );
}



export default FindContainer;