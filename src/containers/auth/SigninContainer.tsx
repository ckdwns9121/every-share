/* 이메일 로그인 페이지 */
import {useState,useRef,useEffect} from 'react';
import styles from './SigninContainer.module.scss';
import LOGO from '../../static/svg/logo2.svg';
import {ButtonBase,IconButton} from '@material-ui/core';

import {RoutePaths} from '../../core/utils/path';
import {useHistory} from 'react-router-dom'; 
import { useDispatch } from 'react-redux';


//aseet

import KAKAO_LOGIN from '../../static/svg/auth/icon_kakao.svg';
import NAVER_LOGIN from '../../static/svg/auth/icon_naver.svg';
import FACEBOOK_LOGIN from '../../static/svg/auth/icon_face.svg';
import BasicButton from '../../components/button/BasicButton';
import cn from 'classnames/bind';


//api
import {requestPostSignin,requestGetUser} from '../../api/auth';

//store
import {set_user} from '../../store/user';

//hook
import {useSnackbar,useLoading} from '../../hooks/useAsset';


const cx= cn.bind(styles);

function SigninContainer(){

    const history = useHistory();
    const ref = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const {handleLoading} = useLoading();
    const [handleOpen, handleClose] = useSnackbar();


    const [form,setForm] = useState<{email:string , password:string}>({email:'', password :''});

    const {email,password} = form;

    const handleChange =(e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = e.target;
        setForm({
            ...form,
            [name]: value
          });

    }
    const onClickLogin = async ()=>{
        try{
        handleLoading(true);
            const res= await requestPostSignin(email,password);
            console.log(res);
            if(res?.data.message==='success'){
                localStorage.setItem('access_token' , res.data.token);
                const response = await requestGetUser(res.data.token);
                if(response?.data.message==='success'){
                  dispatch(set_user(response.data.user));
                }
                history.push(RoutePaths.main.index);
            }
            else{
                handleOpen(res?.data.message,true,false,'error');
                // alert(res?.data.message);
            }
      handleLoading(false);

        }
        catch(e){
            handleLoading(false);

        }
    }
    useEffect(()=>{
        ref?.current?.focus();
    },[])
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
                        <input type='text' name="email" placeholder={"이메일을 입력해주세요"}  value ={email} onChange={handleChange} ref={ref}/>
                    </div>
                    <div className={styles['input-box']}>
                        <input type='password' name="password" placeholder={"비밀번호를 입력해주세요"}  value={password} onChange={handleChange}/>
                    </div>
                    <div className={styles['find-info']}>
                        <div className={styles['link']} onClick={()=>history.push(RoutePaths.auth.find.index)}>
                             아이디 / 비밀번호 찾기
                        </div>
                    </div>
                    <div className={styles['button-box']}>
                        <BasicButton name={"로그인"} disable={ !(email.length!==0 && password.length!==0)}  onClick={onClickLogin}/>
                        <BasicButton name={"회원가입"} disable={false} color={'gray'} onClick={()=>history.push(RoutePaths.auth.signup)}/>
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