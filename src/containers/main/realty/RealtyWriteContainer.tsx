import styles from "./RealtyWriteContainer.module.scss";
import React, { useState,useCallback, useEffect } from "react";
import {Button,ButtonBase} from '@material-ui/core';
import Close from '../../../components/asset/Close';

//api
import {requestPostRealty,requestGetRealty} from '../../../api/realty';
import {requestGetAddressInfo} from '../../../api/address';

//hooks
import {useToken} from '../../../hooks/useStore';
import { useHistory } from "react-router";
import {useLoading,useSnackbar} from '../../../hooks/useAsset';

//lib
import {numberFormat} from '../../../core/lib/formatChecker';
import {getFormatDate,calculateDate2} from '../../../core/lib/calculateDate';
import {onlyNumber} from '../../../core/lib/formater';
import { RoutePaths } from "../../../core/utils/path";
import { S_IFBLK } from "constants";

declare global {
  interface Window {
    daum: any;
  }
}

let today: Date = new Date();

interface TitleComponentProps {
  text: string;
};

interface Props{
  id?: string
}
interface ImageItemProps{
  src : string,
  index : number,
  onDelete: (index?:number)=>void,
}

const TitleBar: React.FC<TitleComponentProps> = ({ text }) => {
  return (
    <div className={styles["title-box"]}>
      <p className={styles["title"]}>{text}</p>
    </div>
  );
};

function RealtyWriteContainer({id}:Props) {

  const history = useHistory();
  const access_token = useToken();
  const {loading,handleLoading} = useLoading(); 
  const {handleOpen, handleClose} = useSnackbar();

  const [realty_images , setImages] = useState<object[]>([]);
  const [contract_image , setContractImage] = useState<string>('');
  const [realty_srcs , setSrcs] = useState<string[]>([]);
  const [contract_src , setContractSrc] = useState<string>('');

  const [open ,setOpen] = useState<boolean>(false);
  const [realty_name , setReatlyName] = useState<string>(''); //이름
  const [addr, setAddr ] = useState<string>(''); //주소
  const [addr_detail,setAddrDetail] = useState<string>('');
  const [all_floor,setAllFloor] = useState<number|string>("");
  const [my_floor,setMyFloor] = useState<number|string>("");
  const [date ,setDate] = useState<{start_date : string ,end_date: string }>({start_date:getFormatDate(today),end_date : getFormatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()+1))});
  const [comment,setComment] = useState<string>('');
  const [sub_comment,setSubComment] = useState<string>('');
  const [deposit ,setDeposit] = useState<string>(''); //보증금
  const [monthly_rent ,setMonthRent] = useState<string>(''); //월세

  const [position ,setPosition] = useState({lat:0,lng:0});

  const onChangeName =(e: React.ChangeEvent<HTMLInputElement>) => setReatlyName(e.target.value);
  const onChangeComment =(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value);
  const onChangeSubComment =(e: React.ChangeEvent<HTMLTextAreaElement>) => setSubComment(e.target.value);
  const onChangeDeposit = (e: React.ChangeEvent<HTMLInputElement>) =>setDeposit(e.target.value);
  const onChangeMonthRent = (e: React.ChangeEvent<HTMLInputElement>) =>setMonthRent(e.target.value);
  const onChangeAllFloor = (e: React.ChangeEvent<HTMLInputElement>) =>setAllFloor(onlyNumber(e.target.value))
  const onChangeFloor = (e: React.ChangeEvent<HTMLInputElement>) =>setMyFloor(onlyNumber(e.target.value));

  const onChangeDate =(e:React.ChangeEvent<HTMLInputElement>)=>{

    const {name , value} = e.target;
    const {start_date, end_date} = date;

    if ( name==='start_date' ?  calculateDate2(value,end_date) : calculateDate2(start_date,value)) {
      setDate({
        ...date,
        [name]: value,
      });
    }
    else{
      handleOpen('시작일이 종료일보다 많을 수 없습니다.',true,false,'default');

    }
  }
  const onDeleteRealtyImage =(index?:number)=>{
      setImages(realty_images.filter((item,i)=> i!==index));
      setSrcs (realty_srcs .filter((item,i)=>i!==index))
  }
  const onDeleteContractImage =()=>{
    setContractImage('');
    setContractSrc('');
  }

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
          date.start_date,
          date.end_date,
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

  //상세정보 들고오기
  const callGetApiRealty = async () => {
    if(id){
      try {
        handleLoading(true);
        const res = await requestGetRealty(id, access_token);
        console.log(res);
        if (res?.data?.message === "success") {
          console.log(res);
          setReatlyName(res.data.realty.realty_name);
          setAddrDetail(res.data.realty.addr_detail);
          setAddr(res.data.realty.addr);
          setAllFloor(res.data.realty.realty_all_floors);
          setMyFloor(res.data.realty.realty_my_floors);
          setDeposit(res.data.realty.deposit)
          setMonthRent(res.data.realty.monthly_rent)
          setComment(res.data.realty.realty_comment);
          setSubComment(res.data.realty.realty_subcomment);
          setDate({
            start_date:getFormatDate(new Date(res.data.realty.oper_start_time)) , 
            end_date: getFormatDate(new Date(res.data.realty.oper_end_time)) 
          })
        }
        handleLoading(false);
      } catch (e) {
        console.log(e);
        handleLoading(false);
      }
    }
  };

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

useEffect(()=>{
  console.log(date);
},[date])


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

useEffect(()=>{
    callGetApiRealty();
},[id])


return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <TitleBar text="매물 기본 정보" />

        <div className={styles["info-box"]}>
          <input type="text"  name='name' placeholder="매물 제목을 입력하세요 ex)○○대학교 앞 원룸 방 내놓습니다." value={realty_name} onChange={onChangeName}/>
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
            <input type="text" placeholder="전체층수를 입력하세요" value={all_floor} onChange={onChangeAllFloor}/>
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
                value={numberFormat(deposit)}
                className={styles["costInput"]}
              />
              <p>만원</p>
            </div>
            <div className={styles["half-box"]}>
              <p>월세</p>
              <input
                type="text"
                value={numberFormat(monthly_rent)}
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
        <TitleBar text="위치 정보" />
        <div className={styles["locationInfo-box"]}>
          <Button className={styles['address-search']} onClick={()=>setOpen(true)}>주소찾기</Button>
          <input type="text" placeholder="주소" defaultValue={addr} readOnly/>
          <input type="text" placeholder="상세 주소"  value={addr_detail} onChange={(e)=>setAddrDetail(e.target.value)}/>
        </div>

        <TitleBar text="대여 기간" />
        <div className={styles["date-box"]}>
          <div className={styles["date"]}>
            <p className={styles["subTitle"]}>입주 시작 일자</p>
            <input type="date" value={(date.start_date)} min={getFormatDate(today)}  onChange={onChangeDate} name="start_date"/>
          </div>

          <div className={styles["date"]}>
            <p className={styles["subTitle"]}>입주 종료 일자</p>
            <input type="date" value={(date.end_date)} min={date.start_date} onChange={onChangeDate} name="end_date"/>
          </div> 
        </div>
        <TitleBar text="추가 정보" />
        <div className={styles["additionalInfo-box"]}>
          <div className={styles["option-box"]}>
            <p className={styles["subTitle"]}>옵션 항목</p>

            <div className={styles["options"]}>
              <ButtonBase className={styles["option"]}>가스레인지</ButtonBase>
              <ButtonBase className={styles["option"]}>전자레인지</ButtonBase>
              <ButtonBase className={styles["option"]}>인덕션</ButtonBase>
              <ButtonBase className={styles["option"]}>침대</ButtonBase>
              <ButtonBase className={styles["option"]}>책상</ButtonBase>
              <ButtonBase className={styles["option"]}>옷장</ButtonBase>
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
              {realty_srcs.map((item,index)=> <ImageItem src={item} key={index} index={index} onDelete={onDeleteRealtyImage}/> )}
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
              {contract_src && <ImageItem src={contract_src} index={0} onDelete={onDeleteContractImage}/>}
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

          <Button className={styles["registerButton"]} onClick={onClickEnrollment}>{id? '매물 수정' : '매물 등록'}</Button>
        </div>
      </div>
    </div>
  );
}


const ImageItem =( {src, onDelete, index}: ImageItemProps)=>{

  return(
    <div className={styles['image-item']}>
  <img src={src}/>
  <div className={styles['delete']} onClick={()=>onDelete(index)}><Close/></div>
  </div>
  )
}
export default RealtyWriteContainer;
