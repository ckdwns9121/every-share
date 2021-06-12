/* 매물 상세보기 페이지 */

import { Fragment ,useState,useEffect,useCallback,useRef, useReducer} from "react";
import { useHistory } from "react-router-dom";
import { RoutePaths } from "../../core/utils/path";
import { MatchId } from "../../types/RouterParams";
import styles from "./DetailContainer.module.scss";
import Header from "../../components/header/Header";
import {Button} from '@material-ui/core';

//asset
import GASSTOVE from '../../static/svg/options/gasstove.svg';
import ROAD_VIEW from '../../static/svg/view.svg';
import PHONE from '../../static/svg/phone.svg';
import MESSAGE from '../../static/svg/message.svg';
import HOME from '../../static/image/test.png';

//modal
import RoadviewModal  from "../../components/modal/RoadviewModal";

function DetailContainer({ id,modal }: MatchId) {
  
  const history = useHistory();

  const kakao_map = useRef<any>(null); //카카오 맵


  useEffect(()=>{
    let container = document.getElementById('detail-map');
    let options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    let map = new window.kakao.maps.Map(container, options);
    kakao_map.current = map;
},[])

  return (
    <Fragment>
      <Header title={"에덴빌라"} />
      <div className={styles["container"]}>
        <div className={styles["content"]}>
          <div className={styles["realty-img"]}>
            <img src={HOME} alt='home'/>
          </div>
          <div className={styles["realty-main"]}>
            <div className={styles["realty-title"]}>에덴빌라</div>
            <div className={styles["realty-comment"]}>
              방학때 본가에 가게 됐어요 .. 3개월 정도 지내실분 연락주세요😂 방
              넓고 깨긋하고 좋습니다.
            </div>
            <div className={styles["realty-createdAt"]}>1일전</div>
          </div>
          <div className={styles["realty-sub"]}>
            <div className={styles["realty-box"]}>
              <div className={styles["column"]}>월세</div>
              <div className={styles["value"]}>300/25</div>
            </div>
            <div className={styles["realty-box"]}>
              <div className={styles["column"]}>월세</div>
              <div className={styles["value"]}>300/25</div>
            </div>
            <div className={styles["realty-box"]}>
              <div className={styles["column"]}>월세</div>
              <div className={styles["value"]}>300/25</div>
            </div>
          </div>
          <div className={styles["realty-info"]}>
            <div className={styles["title"]}>상세정보</div>
            <RealtyInfo text={"주소"} value={"창원시 성산구 성원아파트 101동 1010호."}/>
            <RealtyInfo text={"주소"} value={"창원시 성산구 성원아파트 101동 1010호."}/>
            <RealtyInfo text={"주소"} value={"창원시 성산구 성원아파트 101동 1010호."}/>
            <RealtyInfo text={"주소"} value={"창원시 성산구 성원아파트 101동 1010호."}/>
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
              집주인이 성격이 좋아요😂
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
      <RoadviewModal open={modal==='roadview'}></RoadviewModal>
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
function RealtyInfo({ text, value }: { text: string; value: string }) {
  return (
    <div className={styles["info"]}>
      <div className={styles["text"]}>{text}</div>
      <div className={styles["value"]}>{value}</div>
    </div>
  );
}
export default DetailContainer;
