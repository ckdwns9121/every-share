/* 로그인 안내창 페이지 */

import styles from './LoginContainer.module.scss';
import { ButtonBase } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { RoutePaths } from '../../core/utils/path';

//asset
import LOGO from '../../static/image/mainlogo.png';
import KAKAO_LOGIN from '../../static/svg/auth/icon_kakao.svg';
import NAVER_LOGIN from '../../static/svg/auth/icon_naver.svg';
import FACEBOOK_LOGIN from '../../static/svg/auth/icon_face.svg';
import EMAIL_LOGIN from '../../static/svg/auth/icon_email.svg';

interface ButtonProps {
  name: string;
  src: string;
  color: string;
  background: string;
  onClick: () => void;
}

function LoginContainer() {
  const history = useHistory();

  const onClick = (path: string) => {
    history.push(path);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['service-logo']}>
          <div className={styles['logo-image']}>
            <img src={LOGO} alt="logo" />
          </div>
        </div>
        <div className={styles['wrapper']}>
          <LoginButton
            name={'네이버로 시작하기'}
            src={NAVER_LOGIN}
            background={'#00BF19'}
            color={'#fff'}
            onClick={() => onClick('/')}
          />
          <LoginButton
            name={'카카오로 시작하기'}
            src={KAKAO_LOGIN}
            background={'#FCE000'}
            color={'#381E1F'}
            onClick={() => onClick('/')}
          />
          <LoginButton
            name={'페이스북으로 시작하기'}
            src={FACEBOOK_LOGIN}
            background={'#4267B2'}
            color={'#fff'}
            onClick={() => onClick('/')}
          />
          <LoginButton
            name={'이메일로 시작하기'}
            src={EMAIL_LOGIN}
            background={'#333333'}
            color={'#fff'}
            onClick={() => onClick(RoutePaths.auth.signin)}
          />
        </div>
      </div>
    </div>
  );
}

function LoginButton({ name, src, background, color, onClick }: ButtonProps) {
  return (
    <ButtonBase
      className={styles['login-button']}
      style={{ background: `${background}` }}
      onClick={onClick}
    >
      <div className={styles['src']}>
        <img src={src} alt={name} />
      </div>
      <div className={styles['name']} style={{ color: `${color}` }}>
        {name}
      </div>
    </ButtonBase>
  );
}

export default LoginContainer;
