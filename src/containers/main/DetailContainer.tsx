/* 매물 상세보기 페이지 */

import { Fragment ,useState,useEffect,useCallback,useRef, useReducer} from "react";
import { useHistory } from "react-router-dom";
import { RoutePaths } from "../../core/utils/path";
import { MatchId } from "../../types/RouterParams";
import styles from "./DetailContainer.module.scss";
import Header from "../../components/header/Header";
import {Button,IconButton} from '@material-ui/core';

//asset
import GASSTOVE from '../../static/svg/options/gasstove.svg';
import ROAD_VIEW from '../../static/svg/view.svg';
import PHONE from '../../static/svg/phone.svg';
import MESSAGE from '../../static/svg/message.svg';
import HOME from '../../static/image/test.png';
import CONTRACT from '../../static/svg/contract.svg';

//modal
import RoadviewModal  from "../../components/modal/RoadviewModal";


//api
import {requestGetRealty} from '../../api/realty';

//type
import {Realty} from '../../types/Realty';

//lib

import {dateToRelative} from '../../core/lib/formatChecker';

function DetailContainer({ id,modal }: MatchId) {
  
  const history = useHistory();

  const kakao_map = useRef<any>(null); //카카오 맵

  const [realty , setRealty] = useState<Realty | null>(null);
  const [likes ,setLikes] = useState([]);

  const callGetApiRealty = async()=>{
    try{
      const res= await requestGetRealty(id);
      console.log(res);
      if(res?.data?.message==='success'){
        setRealty(res.data.realty);
        setLikes(res.data.likes);
      }
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    let container = document.getElementById('detail-map');
    let options = {
      center: new window.kakao.maps.LatLng(realty?.lat, realty?.lng),
      level: 3
    };
    let map = new window.kakao.maps.Map(container, options);
    kakao_map.current = map;
},[realty])

useEffect(()=>{
  window.scrollTo(0,0);
},[])

useEffect(()=>{
  callGetApiRealty();
},[id])

  return (
    <Fragment>
      <Header title={realty?.realty_name} />
      <div className={styles["container"]}>
        <div className={styles["content"]}>
          <div className={styles["realty-img"]}>
            <img src={HOME} alt='home'/>
          </div>
          <div className={styles["realty-main"]}>
            <div className={styles["realty-title"]}>{realty?.realty_name}</div>
            <div className={styles["realty-comment"]}>
              {realty?.realty_comment}
            </div>
            <div className={styles["realty-createdAt"]}>
              {realty && 
               `${dateToRelative(new Date(realty?.createdAt))}`
              }
             </div>
          </div>
          <div className={styles["realty-sub"]}>
            <div className={styles["realty-box"]}>
              <div className={styles["column"]}>월세</div>
              <div className={styles["value"]}>
                {realty?. deposit} / {realty?.monthly_rent}
              </div>
            </div>
            <div className={styles["realty-box"]}>
              <div className={styles["column"]}>관리비</div>
              <div className={styles["value"]}> 월세에 포함 </div>
            </div>
            <div className={styles["realty-box"]}>
              <div className={styles["value"]}>
                  <IconButton className={styles['contract']}>
                    <img src={CONTRACT}/>
                  </IconButton>
              </div>
            </div>
          </div>
          <div className={styles["realty-info"]}>
            <div className={styles["title"]}>상세정보</div>
            <RealtyInfo text={"주소"} value={realty?.addr}/>
            <RealtyInfo text={"상세주소"} value={realty?.addr_detail}/>
            <RealtyInfo text={"층수"} value={`${realty?.realty_my_floors} /${realty?.realty_all_floors}층`}/>
            <RealtyInfo text={"종류"} value={"복층 오피스텔"}/>
          </div>
          <div className={styles["realty-info"]}>
            <div className={styles["title"]}>옵션</div>
            <ul className={styles['options']}>
              <RealtyOptionItem src={GASSTOVE} name={"가스레인지"}/>
              <RealtyOptionItem src={GASSTOVE} name={"가스레인지"}/>
              <RealtyOptionItem src={GASSTOVE} name={"가스레인지"}/>
              <RealtyOptionItem src={GASSTOVE} name={"가스레인지"}/>
              <RealtyOptionItem src={GASSTOVE} name={"가스레인지"}/>
              <RealtyOptionItem src={GASSTOVE} name={"가스레인지"}/>
              <RealtyOptionItem src={GASSTOVE} name={"가스레인지"}/>
              <RealtyOptionItem src={GASSTOVE} name={"가스레인지"}/>
              <RealtyOptionItem src={GASSTOVE} name={"가스레인지"}/>
            </ul>
          </div>

          <div className={styles["realty-info"]}>
            <div className={styles["title"]}>위치</div>
            <div className={styles['road-view']}>
            <Button className={styles['road-view-button']} onClick={()=>history.push(`${RoutePaths.main.detail}/roadview/${id}`)} >
                <img src={ROAD_VIEW} alt="road-view"></img>
                <span>로드뷰 보기</span>
              </Button>
            </div>
            <div id="detail-map" style={{ marginTop:'15px', width: '100%', height: '200px', zIndex: 1 }}/>
          </div>
          <div className={styles["realty-info"]}>
            <div className={styles["title"]}>추가 설명</div>
              <div className={styles['sub-comment']}>
              {realty?.realty_subcomment}
              </div>
          </div>
        </div>
      </div>
      <div className={styles['contact']}>
         <Button className={styles['button']}>
           <img src ={PHONE} alt="PHONE"></img>
           <span>전화로 문의</span>
         </Button>
         <Button className={styles['button']}>
           <img src ={MESSAGE} alt="MESSAGE"></img>
           <span>문자로 문의</span>
         </Button>
      </div>
      <RoadviewModal open={modal==='roadview'} lat={realty?.lat} lng={realty?.lng}></RoadviewModal>
    </Fragment>
  );
}

function RealtyOptionItem({src,name}:{src:string,name:string}) {
  return (
    <li className={styles["option-item"]}>
      <div className={styles["option-img"]}>
        <img src={src} alt={name} />
      </div>
      <div className={styles["option-name"]}>{name}</div>
    </li>
  );
}

// 매물 상새정보 아이템
function RealtyInfo({ text, value }: { text?: string; value?: string }) {
  return (
    <div className={styles["info"]}>
      <div className={styles["text"]}>{text}</div>
      <div className={styles["value"]}>{value}</div>
    </div>
  );
}
export default DetailContainer;
