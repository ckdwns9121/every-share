/* 이메일 로그인 페이지 */
import styles from './SigninContainer.module.scss';
import LOGO from '../../static/svg/logo2.svg';
import {ButtonBase,IconButton} from '@material-ui/core';

import {RoutePaths} from '../../core/utils/path';
import {useHistory} from 'react-router-dom'; 


//aseet

import KAKAO_LOGIN from '../../static/svg/auth/icon_kakao.svg';
import NAVER_LOGIN from '../../static/svg/auth/icon_naver.svg';
import FACEBOOK_LOGIN from '../../static/svg/auth/icon_face.svg';

import cn from 'classnames/bind';

const cx= cn.bind(styles);

function SigninContainer(){

    const history = useHistory();

    const onClickLogin = async ()=>{
        try{
            history.push(RoutePaths.main.index);
        }
        catch(e){

        }
    }

    return(
        <div className={styles['container']}>
            <div className={styles['content']}>
                <div className={styles['logo-box']}>
                <div className={styles['logo']}>
                            <img src={LOGO} alt="logo"/>
                    </div>
                </div>
                <div className={styles['wrapper']}>
                    <div className={styles['input-box']}>
                        <input type='text' name="email" placeholder={"이메일을 입력해주세요"} />
                    </div>
                    <div className={styles['input-box']}>
                        <input type='password' name="password" placeholder={"비밀번호를 입력해주세요"} />
                    </div>
                    <div className={styles['find-info']}>
                        <div className={styles['link']}>
                             아이디 / 비밀번호 찾기
                        </div>
                    </div>
                    <div className={styles['button-box']}>
                    <ButtonBase className={cx('basic-button')} disabled={false} disableRipple={false} onClick={onClickLogin} >
                            로그인
                    </ButtonBase>
                    <ButtonBase className={cx('basic-button',{gray:true})}  disableRipple={false} onClick={()=>history.push(RoutePaths.auth.signup)} >
                            회원가입
                    </ButtonBase>
                    </div>
                    <div className={styles['sns-box']}>
                        <div className={styles['sns-text']}>
                                소셜 로그인
                        </div>
                        <div className={styles['sns-icon']}>
                        <IconButton className={styles['sns-login']} style={{background:'#00BF19'}}>
                            <img src={NAVER_LOGIN} alt="네이버"/>
                        </IconButton>
                        <IconButton className={styles['sns-login']} style={{background:'#FCE000'}}>
                            <img src={KAKAO_LOGIN} alt="카카오"/>
                        </IconButton>
                        <IconButton className={styles['sns-login']} style={{background:'#4267B2'}}>
                            <img src={FACEBOOK_LOGIN} alt="페이스북"/>
                        </IconButton>
                        </div>

                    </div>
                </div>             
            </div>
        </div>
    )
}


export default SigninContainer;