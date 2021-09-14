import styles from "./RealtyWriteContainer.module.scss";
import { useState,useCallback, useEffect } from "react";
import {Button} from '@material-ui/core';

import plusIcon from "../../../static/svg/plug.svg";

import realty1 from "../../../static/image/realty/rinda1.jpg";
import realty2 from "../../../static/image/realty/rinda2.jpg";
import contract1 from "../../../static/image/realty/contract1.gif";
import defaultImage from "../../../static/image/realty/default.jpg";

//api
import {requestPostRealty} from '../../../api/realty';
import {requestGetAddressInfo} from '../../../api/address';

//hooks
import {useToken} from '../../../hooks/useStore';
import { useHistory } from "react-router";
import { RoutePaths } from "../../../core/utils/path";
import useLoading from '../../../hooks/useLoading';

//lib
import {numberFormat} from '../../../core/lib/formatChecker';
import {onlyNumber} from '../../../core/lib/formater';


type TitleComponentProps = {
  text: string;
};


declare global {
  interface Window {
    daum: any;
  }
}

type Props={
  id?: string
}


const TitleComponent: React.FC<TitleComponentProps> = ({ text }) => {
  return (
    <div className={styles["title-box"]}>
      <p className={styles["title"]}>{text}</p>
    </div>
  );
};

function RealtyWriteContainer({id}:Props) {


  const history = useHistory();
  const access_token = useToken();
  const [realty_images , setImages] = useState<object[]>([]);
  const [contract_image , setContractImage] = useState<string>('');
  const [realty_srcs , setSrcs] = useState<string[]>([]);
  const [contract_src , setContractSrc] = useState<string>('');

  const [open ,setOpen] = useState<boolean>(false);
  const {loading,handleLoading} = useLoading(); 

  const [realty_name , setReatlyName] = useState<string>(''); //이름
  const [addr, setAddr ] = useState<string>(''); //주소
  const [addr_detail,setAddrDetail] = useState<string>('');
  const [all_floor,setAllFloor] = useState<number|string>("");
  const [my_floor,setMyFloor] = useState<number|string>("");

  const [start_date , setStartDate] = useState<string|null>(null);
  const [end_date , setEndDate] = useState<string|null>(null);
  const [comment,setComment] = useState<string>('');
  const [sub_comment,setSubComment] = useState<string>('');
  const [deposit ,setDeposit] = useState<string>('500'); //보증금
  const [monthly_rent ,setMonthRent] = useState<string>('30'); //월세

  const [position ,setPosition] = useState({lat:0,lng:0});

  const onChangeName =(e: React.ChangeEvent<HTMLInputElement>) => setReatlyName(e.target.value);
  const onChangeComment =(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value);
  const onChangeSubComment =(e: React.ChangeEvent<HTMLTextAreaElement>) => setSubComment(e.target.value);
  const onChangeDeposit = (e: React.ChangeEvent<HTMLInputElement>) =>setDeposit(e.target.value);
  const onChangeMonthRent = (e: React.ChangeEvent<HTMLInputElement>) =>setMonthRent(e.target.value);
  const onChangeAllFloor = (e: React.ChangeEvent<HTMLInputElement>) =>setAllFloor(onlyNumber(e.target.value))
  const onChangeFloor = (e: React.ChangeEvent<HTMLInputElement>) =>setMyFloor(onlyNumber(e.target.value));
  
  // 매물 등록
  const onClickEnrollment = async()=>{
    try{
      console.log(access_token);
      handleLoading(true);
      if(access_token){
        const res = await requestPostRealty(
          access_token, //JWT_TOKEN
          realty_name,
          1, // TYPE
          1, //KIND
          all_floor, // ALL_FLOORS
          my_floor, // MY_FLOORS
          parseInt(deposit), //보증금
          parseInt(monthly_rent), // 월세
          0, // 관리비
          comment, //코멘트
          addr, //주소
          addr_detail, //  상세주소
          '',//임시주소
          '0',
          position.lat,
          position.lng,
          sub_comment,
          '{gas:1}',
          realty_images,
          '2021-05-15',
          '2021-07-15',
          '1',
          contract_image,
          )
          console.log(res);
          if(res?.data.message==='success'){
            history.push(RoutePaths.main.detail +'/' + res.data.data.realty_id);
          }
      }
     handleLoading(false);
    }
    catch(e : any){
      console.log(e.response);
    }
  }

  // 매물 사진 업로드
  const onUploadFile = useCallback(async (e) => {
    let file = e.target.files[0];
    let fileReader = new FileReader();
    try{
        if(file){
          console.log(file);
           setImages(realty_images.concat(file));
            fileReader.onload =(e : any) =>{
              setSrcs(realty_srcs.concat(e.target.result));
            }
        }
        fileReader.readAsDataURL(file)
    }   
    catch(e){
      console.log(e);
    }
}, [realty_images,realty_srcs]);


// 매물 임시 계약서 업로드
const onUploadContract = useCallback(async (e) => {
  let file = e.target.files[0];
  let fileReader = new FileReader();
  try{
      if(file){
          setContractImage(file);
          fileReader.onload =(e : any) =>{
            setContractSrc(e.target.result);
          }
      }
      fileReader.readAsDataURL(file)
  }   
  catch(e){
    console.log(e);
  }
}, []);


//주소창 모달 오픈
useEffect(() => {
  if(open){
    new window.daum.Postcode({
      oncomplete: async function (data: any) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
  
        // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var roadAddr = data.roadAddress; // 도로명 주소 변수
        var extraRoadAddr = ""; // 참고 항목 변수
        console.log(roadAddr);
        setAddr(roadAddr);
        const res = await requestGetAddressInfo(roadAddr);
        console.log(res);
        if(res?.data?.documents){
          setPosition({lat: res.data.documents[0].y , lng : res.data.documents[0].x});
        }
      },
    onclose: function(state : string) {
      setOpen(false);
    }
    }).open();
  }
}, [open]);


return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <TitleComponent text="매물 기본 정보" />

        <div className={styles["info-box"]}>
          <input type="text"  name='name' placeholder="매물 이름을 입력하세요" value={realty_name} onChange={onChangeName}/>
          <select>
            <option value="oneroom">원룸</option>
            <option value="tworoom">투룸</option>
            <option value="op">오피스텔</option>
            <option value="duplex">복층</option>
          </select>

          <select>
            <option value="short">단기</option>
            <option value="long">장기</option>
          </select>
          <div style={{position:'relative',width:"100%"}} >
            <input type="text" placeholder="전체층수를 입력하세요" value={numberFormat(all_floor)} onChange={onChangeAllFloor}/>
            <span className={styles['floor']}>층</span>
          </div>
          <div style={{position:'relative',width:"100%"}} >
          <input style={{position:'relative'}} type="text" placeholder="해당층수를 입력하세요" value={my_floor} onChange={onChangeFloor}/>
          <span className={styles['floor']}>층</span>
          </div>
          <div className={styles["divide"]}>
            <div className={styles["half-box"]}>
              <p>보증금</p>
              <input
                type="text"
                onChange={onChangeDeposit}
                value={deposit}
                className={styles["costInput"]}
              />
              <p>만원</p>
            </div>
            <div className={styles["half-box"]}>
              <p>월세</p>
              <input
                type="text"
                value={monthly_rent}
                onChange={onChangeMonthRent}
                className={styles["costInput"]}
              />
              <p>만원</p>
            </div>
            <p className={styles["notice"]}>관리비 포함으로 작성.</p>
          </div>

          <div className={styles["description-box"]}>
            <p className={styles["subTitle"]}>매물 설명</p>
            <textarea
              className={styles["description"]}
              onChange={onChangeComment}
              value={comment}
              placeholder="방학때 본가에 가게 됐어요 😂 3개월만 사실분 구합니다!"
            ></textarea>
          </div>
        </div>
        <TitleComponent text="위치 정보" />
        <div className={styles["locationInfo-box"]}>
          <Button className={styles['address-search']} onClick={()=>setOpen(true)}>주소찾기</Button>
          <input type="text" placeholder="주소" value={addr} readOnly/>
          <input type="text" placeholder="상세 주소"  value={addr_detail} onChange={(e)=>setAddrDetail(e.target.value)}/>
        </div>

        <TitleComponent text="대여 기간" />
        <div className={styles["date-box"]}>
          <div className={styles["date"]}>
            <p className={styles["subTitle"]}>입주 시작 일자</p>
            <input type="date" defaultValue="2021-06-21" />
          </div>

          <div className={styles["date"]}>
            <p className={styles["subTitle"]}>입주 종료 일자</p>
            <input type="date" defaultValue="2021-08-20" />
          </div>
        </div>
        <TitleComponent text="추가 정보" />
        <div className={styles["additionalInfo-box"]}>
          <div className={styles["option-box"]}>
            <p className={styles["subTitle"]}>옵션 항목</p>

            <div className={styles["options"]}>
              <button className={styles["option"]}>가스레인지</button>
              <button className={styles["option"]}>전자레인지</button>
              <button className={styles["option"]}>인덕션</button>
              <button className={styles["option"]}>침대</button>
              <button className={styles["option"]}>책상</button>
              <button className={styles["option"]}>옷장</button>
            </div>
          </div>
          <div className={styles["register-box"]}>
            <p className={styles["subTitle"]}>매물 사진 등록</p>
            <p className={styles["notice"]}>실 사진을 등록해주세요</p>
            <div className={styles["fileInput-box"]}>
              <label htmlFor="realty-picture">매물 사진 등록</label>
              <input type="file" id="realty-picture"  onChange={onUploadFile} accept="image/gif, image/jpeg, image/png, image/svg"  />
            </div>
            <div className={styles["RegisteredImage-box"]}>
              {realty_srcs.map((item)=> <img src={item} key={item}/> )}
            </div>
          </div>

          <div className={styles["register-box"]}>
            <p className={styles["subTitle"]}>임시 계약서 등록</p>
            <p className={styles["notice"]}>
              임시계약서를 등록할 시 개인정보는 가려주세요
            </p>
            <div className={styles["fileInput-box"]}>
              <label htmlFor="contract">임시 계약서 등록</label>
              <input type="file" id="contract"  onChange={onUploadContract} accept="image/gif, image/jpeg, image/png, image/svg"  />
            </div>
            <div className={styles["RegisteredImage-box"]}>
              {contract_src && <img src={contract_src} />}

            </div>
          </div>

          <div className={styles["description-box"]}>
            <p className={styles["subTitle"]}>추가 설명</p>
            <textarea
              className={styles["description"]}
              placeholder="최근에 헬스장도 생겨서 월 3만원에 이용이 가능합니다~!"
              onChange={onChangeSubComment}
              value={sub_comment}
            ></textarea>
          </div>

          <Button className={styles["registerButton"]} onClick={onClickEnrollment}>매물등록</Button>
        </div>
      </div>
    </div>
  );
}

export default RealtyWriteContainer;
