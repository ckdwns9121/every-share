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

//api
import {requsetPostSignup} from '../../api/auth';
const cx = cn.bind(styles);

interface Props{
    step: number,
    title : string,
    type: string,
    name:string,
    value:string,

}

function SignupContainer(){

    const [form,setForm] = useState<any>({
        email:'',
        password:'',
        password_confirm:'',
        phone_number:'',

    });
    const [agree,setAgree] = useState({privacy:true,service:true,sms:false});
    const { email,password,password_confirm,phone_number} = form;
    const {privacy,service, sms} = agree;

    const [step, setStep] = useState<number>(1);
    const history = useHistory();


    const width : number = step === 0 ? step : (100 * step) /5;
    const result : string = width.toString();

    const onChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = e.target;
        setForm({
          ...form,
          [name]: value
        });
    };

    const SIGN_STEP  :Props[]=[
        {
            step:1,
            title:'이메일을<br/>입력해주세요',
            type:"text",
            name:'email',
            value:email,
        },
        {
            step:2,
            title:'비밀번호를<br/>입력해주세요',
            type:"password",
            name:'password',
            value:password,

        },
        {
            step:3,
            title:'비밀번호를<br/>한번 더 입력해주세요',
            type:"password",
            name:'password_confirm',
            value:password_confirm,

        },
        {
            step:4,
            title:'휴대폰 번호를<br/>입력해주세요',
            type:"text",
            name:'phone_number',
            value:phone_number,
            
        },
        {
            step:5,
            title:'이용약관 및 개인정보 수집<br/>이용에 대한 동의',
            type:"check",
            name:'check',
            value:'1',
        },
    ]

    const onClickHeader= useCallback(()=>{
        if(step>1) setStep(prev=>prev-1);        
        else history.goBack();
    },[step,history]);


    // 유저 회원가입
    const onClickSignup = async ()=>{
        try{
            const res = await requsetPostSignup(email,null,password,phone_number,sms,false,null);
            console.log(res);
            if(res?.data?.message==='success'){
                history.push(RoutePaths.auth.sign_complete);
            }
            else{
                alert(res.data.message);
            }
        }
        catch(e){
            console.log('에러');
        }
    }
    const onClickNext = () => {
      switch (step) {
        case 1:
         email.length === 0 ? alert("이메일을 입력해주세요") : setStep((prev) => prev + 1)
          break;
        case 2:
          password.length === 0 ? alert("비밀번호를 입력해주세요") : setStep((prev) => prev + 1)
          break;
        case 3:
          password_confirm.length === 0 && alert("비밀번호를 입력해주세요");
          if(password_confirm !==password){
              alert('비밀번호가 일치하지 않습니다.');
          }
          else{
            setStep((prev) => prev + 1)
          }
          break;
        case 4:
          phone_number.length === 0 ? alert("휴대폰번호를 입력해주세요") : setStep((prev) => prev + 1)
          break;
        case 5:
            onClickSignup();
          break;
        default:
        console.log('hello');
          break;
      }

      // step <5 ? setStep(prev=>prev+1) :onClickSignup()
    };

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
                <div className={styles['wrapper']}>
                        <div className={styles['title']}>
                            <p dangerouslySetInnerHTML={{__html:SIGN_STEP[step-1].title}} style={{color:"#222", fontWeight:500,fontSize:"20px"}}/>
                        </div>
                        {step < 5 ? 
                        <div className={styles['input-box']}>
                            <input type={SIGN_STEP[step-1].type} value={SIGN_STEP[step-1].value} onChange={onChange} name={SIGN_STEP[step-1].name}/>
                        </div> :
                        <div className={styles['check-box']}>
                            <Checkbox id={'privacy'} text={'[필수] 개인정보 수집 이용에 동의합니다.'} check={agree.privacy} onChange={()=>{}}/>
                            <Checkbox id={'service'} text={'[필수] 서비스 이용 약관에 동의합니다.'} check={agree.service} onChange={()=>{}}/>
                            <Checkbox id={'marketing'} text={'[선택] 마케팅 수신에 동의합니다.'} check={agree.sms} onChange={()=>{}}/>
                        </div>
                        }
                        <div className={styles['step-bar']}>
                            <div className={styles['step-success']} style={{width:`${result}%`}}/>
                        </div>
                </div>
                <div className={styles['next']}>
                <ButtonBase className={cx('basic-button')}  disableRipple={false}  onClick={onClickNext}>
                    다음
                </ButtonBase>
                </div>
           </div>
        </div>
        </>
    )
}

// function StepComponent({step,title, type,value,onChange,name} : PanelProp){

//     const width : number = step === 0 ? step : (100 * step) /5;
//     const result : string = width.toString();
//     return(
//         <div className={styles['wrapper']}>
//             <div className={styles['title']}>
//                 <p dangerouslySetInnerHTML={{__html:title}} style={{color:"#222", fontWeight:500,fontSize:"20px"}}/>
//             </div>
//             {step < 5 ? 
//             <div className={styles['input-box']}>
//                   <input type={type} value={value} onChange={onChange} name={name}/>
//             </div> :
//             <div className={styles['check-box']}>
//                   <Checkbox id={'privacy'} text={'[필수] 개인정보 수집 이용에 동의합니다.'} check={true} onChange={()=>{}}/>
//                   <Checkbox id={'service'} text={'[필수] 서비스 이용 약관에 동의합니다.'} check={true} onChange={()=>{}}/>
//                   <Checkbox id={'marketing'} text={'[선택] 마케팅 수신에 동의합니다.'} check={true} onChange={()=>{}}/>
//             </div>
//             }
//             <div className={styles['step-bar']}>
//                 <div className={styles['step-success']} style={{width:`${result}%`}}/>
//             </div>
//         </div>
//     )
// }


export default SignupContainer;