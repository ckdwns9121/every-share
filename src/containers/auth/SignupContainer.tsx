/* 회원가입 페이지 */

import {useState,useCallback} from 'react';

//styles
import styles from './SignupContainer.module.scss';
import header_styles from '../../components/header/Header.module.scss';
import cn from 'classnames/bind';

//components
import {ButtonBase,IconButton} from '@material-ui/core';
import Arrow from '../../components/asset/Arrow';
import Checkbox from '../../components/checkbox/Checkbox';

//hooks
import {useHistory} from 'react-router-dom';
import { RoutePaths } from '../../core/utils/path';
const cx = cn.bind(styles);

interface Props{
    step: number,
    title : string,
    input_type?: string,
    name?:string,
}


const SIGN_STEP : Props[] =[
    {
        step:1,
        title:'이메일을<br/>입력해주세요',
        input_type:"text",
        name:'email'
    },
    {
        step:2,
        title:'비밀번호를<br/>입력해주세요',
        input_type:"text",
        name:'email' 
    },
    {
        step:3,
        title:'비밀번호를<br/>한번 더 입력해주세요',
        input_type:"text",
        name:'email'
    },
    {
        step:4,
        title:'휴대폰 번호를<br/>입력해주세요',
        input_type:"text",
        name:'email'
    },
    {
        step:5,
        title:'이용약관 및 개인정보 수집<br/>이용에 대한 동의',
        input_type:"text",
        name:'email'
    },
]

function SignupContainer(){

    const [step, setStep] = useState<number>(1);
    const history = useHistory();


    const onClickHeader= useCallback(()=>{
        if(step>1) setStep(prev=>prev-1);        
        else history.goBack();
    },[step,history]);

    const onClickSignup = async ()=>{
        try{
            console.log('회원가입');
            history.push(RoutePaths.auth.sign_complete);
        }
        catch(e){

        }
    }

    return(
        <>
        <div className={header_styles['header']}>
        <div className={header_styles['content']}>
            <IconButton
                className={header_styles['back-btn']}
                onClick={onClickHeader}
            >
                <Arrow />
            </IconButton>
            <div className={header_styles['title']}>회원가입</div>
        </div>
    </div>
        <div className={styles['container']}>
           <div className={styles['content']}>
                <StepComponent title={SIGN_STEP[step-1].title} step={step}/>
                <div className={styles['next']}>
                <ButtonBase className={cx('basic-button')}  disableRipple={false}  onClick={()=>{ step <5 ? setStep(prev=>prev+1) :onClickSignup() }}>
                            다음
                </ButtonBase>
                </div>
           </div>
        </div>
        </>
    )
}

function StepComponent({step,title,input_type} : Props){

    const width : number = step === 0 ? step : (100 * step) /5;
    const result : string = width.toString();
    return(
        <div className={styles['wrapper']}>
            <div className={styles['title']}>
                    <p dangerouslySetInnerHTML={{__html:title}} style={{color:"#222", fontWeight:500,fontSize:"20px"}}/>
            </div>
            {step < 5 ? 
            <div className={styles['input-box']}>
                  <input type={'text'} />
            </div> :
            <div className={styles['check-box']}>
                  <Checkbox id={'privacy'} text={'[필수] 개인정보 수집 이용에 동의합니다.'} check={true} onChange={()=>{}}/>
                  <Checkbox id={'service'} text={'[필수] 서비스 이용 약관에 동의합니다.'} check={true} onChange={()=>{}}/>
                  <Checkbox id={'marketing'} text={'[선택] 마케팅 수신에 동의합니다.'} check={true} onChange={()=>{}}/>
            </div>
            }
            <div className={styles['step-bar']}>
                <div className={styles['step-success']} style={{width:`${result}%`}}/>
            </div>
        </div>
    )
}


export default SignupContainer;