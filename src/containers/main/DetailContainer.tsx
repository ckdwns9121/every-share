/* 매물 상세보기 페이지 */

import {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
  useReducer,
} from "react";
import { useHistory,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RoutePaths } from "../../core/utils/path";
import { MatchId } from "../../types/RouterParams";
import styles from "./DetailContainer.module.scss";
import Header from "../../components/header/Header";
import Like from "../../components/asset/Like";
import { Button, IconButton ,ButtonBase} from "@material-ui/core";

//asset
import GASSTOVE from "../../static/svg/options/gasstove.svg";
import BED from "../../static/svg/options/bed.svg";
import MICROWAVE from "../../static/svg/options/microwave.svg";
import WASHER from "../../static/svg/options/washer.svg";

import ROAD_VIEW from "../../static/svg/view.svg";
import PHONE from "../../static/svg/phone.svg";
import MESSAGE from "../../static/svg/message.svg";
import HOME from "../../static/image/test.png";
import CONTRACT from "../../static/svg/contract.svg";

//modal
import RoadviewModal from "../../components/modal/RoadviewModal";
import ContractModal from "../../components/modal/ContractModal";

//api
import { requestGetRealty } from "../../api/realty";
import {requestLike} from '../../api/like';

//type
import { Realty } from "../../types/Realty";

//lib

import {
  dateToRelative,
  imageFormat,
  DBImageFormat,
} from "../../core/lib/formatChecker";

//hooks
import useLoading from "../../hooks/useLoading";
import { useToken } from "../../hooks/useStore";
import useSnackbar  from "../../hooks/useSnackbar";
import {useSelector} from 'react-redux';

//store
import {RootState} from '../../store';
import {setLike} from '../../store/zone';

//aseet
import MARKER from '../../static/svg/map-marker.svg';
function DetailContainer({ id, modal }: MatchId) {
 
  const history = useHistory();
  const dispatch = useDispatch();
  const {user} = useSelector((state:RootState)=>state.user);
  const access_token = useToken();
  const {loading,handleLoading } = useLoading();
  const [handleOpen, handleClose] = useSnackbar();
  const kakao_map = useRef<any>(null); //카카오 맵

  const [realty, setRealty] = useState<Realty | null>(null);
  const [realty_images, setImages] = useState<any>([]);
  const [contract_image, setContractImage] = useState<any>([]);

  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [test, setUrl] = useState<any>("");

  //상세정보 들고오기
  const callGetApiRealty = async () => {
    try {
      handleLoading(true);
      const res = await requestGetRealty(id, access_token);
      console.log(res);
      if (res?.data?.message === "success") {
        setRealty(res.data.realty);
        setLikes(res.data.likes);
        setIsLiked(res.data.isLiked);
        setImages(JSON.parse(res.data.realty.realty_images));
        setContractImage(JSON.parse(res.data.realty.realty_contract_images));
      }
      handleLoading(false);
    } catch (e) {
      console.log(e);
      handleLoading(false);
    }
  };
  
  const onClickLike = async ()=>{
    try{
      if(access_token && realty){
        const res = await requestLike(realty?.realty_id,access_token);
        console.log(res);
        if(res.status===200){
            setIsLiked(res.data.isLiked);
            dispatch(setLike({like:res.data.isLiked , realty_id: realty.realty_id}));
            const msg = res.data.isLiked ? '찜목록에 추가되었습니다' : '찜목록에서 삭제하였습니다.';
            handleOpen(msg,true,false,'success');
        }
      }
      else{
          handleOpen('로그인이 필요한 서비스입니다.',true,false,'warning');
      }

    }
    catch(e :any){
      handleOpen('서버에 오류가 발생했습니다..',true,false,'error');
      console.log(e.response);
    }
  }
  useEffect(() => {
    let container = document.getElementById("detail-map");
    let options = {
      center: new window.kakao.maps.LatLng(realty?.lat, realty?.lng),
      level: 3,
    };
    let map = new window.kakao.maps.Map(container, options);

    var imageSrc= MARKER,
        imageSize = new window.kakao.maps.Size(40,40),
        imageOption = {offset:new window.kakao.maps.Point(20, 40)}
    var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
        markerPosition = new window.kakao.maps.LatLng(realty?.lat, realty?.lng);
    
    var marker = new window.kakao.maps.Marker({
        position:markerPosition,
        image:markerImage
    })
    kakao_map.current = map;
    marker.setMap(kakao_map.current);
  }, [realty]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    callGetApiRealty();
  }, [id]);



  return (
    <Fragment>
      <Header title={realty?.realty_name}>
        <Like on={isLiked} onClick={onClickLike}/>
      </Header>
      <div className={styles["container"]}>
        <div className={styles["content"]}>
          <div
            className={styles["realty-img"]}
            style={{
              backgroundImage: `url(${imageFormat(realty_images[0])})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className={styles["realty-main"]}>
            <div className={styles["realty-title"]}>{realty?.realty_name}</div>
            <div className={styles["realty-comment"]}>
              {realty?.realty_comment}
            </div>
            <div className={styles["realty-createdAt"]}>
              {realty && `${dateToRelative(new Date(realty?.createdAt))}`}
            </div>
          </div>
          <div className={styles["realty-sub"]}>
            <div className={styles["realty-box"]}>
              <div className={styles["column"]}>월세</div>
              <div className={styles["value"]}>
                {realty && realty?.deposit + "/" + realty?.monthly_rent}
              </div>
            </div>
            <div className={styles["realty-box"]}>
              <div className={styles["column"]}>관리비</div>
              <div className={styles["value"]}> {realty && '월세에 포함'}</div>
            </div>
            <div className={styles["realty-box"]}>
              <div className={styles["value"]}>
                <IconButton
                  className={styles["contract"]}
                  onClick={() =>
                    history.push(`${RoutePaths.main.detail}/contract/${id}`)
                  }
                >
                  <img src={CONTRACT} />
                </IconButton>
              </div>
            </div>
          </div>
          <div className={styles["realty-info"]}>
            <div className={styles["title"]}>상세정보</div>
            <RealtyInfo text={"주소"} value={realty?.addr} />
            <RealtyInfo text={"상세주소"} value={realty?.addr_detail} />
            <RealtyInfo
              text={"층수"}
              value={ realty!==null ? `${realty?.realty_my_floors} /${realty?.realty_all_floors}층` : ''}
            />
            <RealtyInfo text={"종류"} value={"복층 오피스텔"} />
          </div>
          <div className={styles["realty-info"]}>
            <div className={styles["title"]}>옵션</div>
            <ul className={styles["options"]}>
              <RealtyOptionItem src={GASSTOVE} name={"가스레인지"} />
              <RealtyOptionItem src={BED} name={"침대"} />
              <RealtyOptionItem src={WASHER} name={"세탁기"} />
              <RealtyOptionItem src={MICROWAVE} name={"전자레인지"} />
            </ul>
          </div>

          <div className={styles["realty-info"]}>
            <div className={styles["title"]}>위치</div>
            <div className={styles["road-view"]}>
              <Button
                className={styles["road-view-button"]}
                onClick={() =>
                  history.push(`${RoutePaths.main.detail}/roadview/${id}`)
                }
              >
                <img src={ROAD_VIEW} alt="road-view"></img>
                <span>로드뷰 보기</span>
              </Button>
            </div>
            <div
              id="detail-map"
              style={{
                marginTop: "15px",
                width: "100%",
                height: "200px",
                zIndex: 1,
              }}
            />
          </div>
          <div className={styles["realty-info"]}>
            <div className={styles["title"]}>추가 설명</div>
            <div className={styles["sub-comment"]}>
              {realty?.realty_subcomment}
            </div>
          </div>
        </div>
      </div>
      <div className={styles["contact"]}>
        { (loading && !realty ) ? <> </> : 
        (user?.user_id === realty?.user_id) ?
          <Link to={`${RoutePaths.main.realty.write}/${realty?.realty_id}`} className={styles['update-button']}>
            수정하기
          </Link>
          :
          <div className={styles['link']}>
            <Button className={styles['contact-button']}>
              간편 문의
            </Button>
        <a href="tel:010-4788-8227" >
            <ButtonBase className={styles["button"]}>
              <img src={PHONE} alt="PHONE"></img>
              전화문의
           </ButtonBase>
        </a>
        <a href="sms:010-4788-8227&body=매물 문의합니다.">
        <ButtonBase className={styles["button"]}>
          <img src={MESSAGE} alt="MESSAGE"></img>
           문자 문의
        </ButtonBase>
        </a>
        </div>
        }
     </div>
      <RoadviewModal
        open={modal === "roadview"}
        lat={realty && realty?.lat }
        lng={realty && realty?.lng}
      ></RoadviewModal>
      <ContractModal
        open={modal === "contract"}
        url={`${imageFormat(contract_image)}`}
      />
    </Fragment>
  );
}

function RealtyOptionItem({ src, name }: { src: string; name: string }) {
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
