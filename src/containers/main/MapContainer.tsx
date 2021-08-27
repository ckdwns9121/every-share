

import {useCallback, useEffect,useRef,useState, useReducer,Fragment} from 'react';
import styles from './MapContainer.module.scss';
import cn from 'classnames/bind';
import '../../styles/_Overlay.scss';
import {Button} from '@material-ui/core';
//lib
import {RoutePaths} from '../../core/utils/path';

//types
import {MatchModal} from '../../types/RouterParams';

//hooks
import {useSelector , useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {useToken} from '../../hooks/useStore';

//store
import {RootState} from '../../store';
import {setLevel} from '../../store/map';

//api

//components
import CircleButton from '../../components/button/CircleButton';
import {IconButton,ButtonBase} from '@material-ui/core';
import SlideMenu from '../../components/menu/SlideMenu';
import BottomModal from '../../components/modal/BottomModal';

//asset

import ZOOMIN from '../../static/svg/zoomin.svg';
import ZOOMOUT from '../../static/svg/zoomout.svg';
import FILTER from '../../static/svg/filter.svg';
import LOCATION from '../../static/svg/location.svg';
import SEARCH from '../../static/svg/search-light.svg';
import MENU from '../../static/svg/menu.svg';
import MAKER from '../../statioc/image/maker.png';

//modal
import AddressModal from '../../components/modal/AddressModal';

//api
import { searchAddress, requestGetAddressInfo } from '../../api/address';

//lib
import {getDistanceFromLatLonInKm} from '../../core/lib/distance';

//type
import {Address} from '../../types/Address';

//store
import {getRealties} from '../../store/realties';
import {setZone} from '../../store/zone';
import ZoneModal from '../../components/modal/ZoneModal';


const cx = cn.bind(styles);

declare global {
    interface Window {
      kakao: any;
      onClickOverlay : (realty_id : string)=>void
    }
}

type Zoom = 'in' | 'out';


function MapContainer({modal}:MatchModal){


    const access_token = useToken();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [filterOpen ,setFilterOpen] = useState<boolean>(false);
    const handleOpen =(type:boolean)=> setMenuOpen(type);
    const handleFilterOpen =(type:boolean) =>setFilterOpen(type);
    const history = useHistory();
    const dispatch = useDispatch();
    const {position,level,area,address} = useSelector((state:RootState) =>state.map);
    const {realties} = useSelector((state:RootState) =>state.realties);
    const {zone_list} = useSelector((state:RootState) =>state.zone);

    const kakao_map = useRef<any>(null); //카카오 맵
    const map_position = useRef<any>({lat:33.450701, lng: 126.570667}); //지도 첫렌더시 좌표
    const map_level = useRef<number>(5); // 디폴트 레벨 -> //4 : 100m 6: 500m 7:1km
    const cluster_marker = useRef<any>(null);

    const [addr , setAddr] = useState<string>(''); //주소검색
    const [addrList,setAddrList] = useState<Address[] | null>(null);

    const zone_view = useRef<boolean>(false); // 매물 버튼 오픈 여부

    // const [zone_list ,setZoneList] = useState<any>([]);
    const [zoneButtonOpen ,setZoneButtonOpen] = useState<boolean>(false);

    // 지도를 렌더하는 함수
    const mapRender = useCallback(() => {
        let container = document.getElementById('map');
        let lat : number = map_position.current.lat;
        let lng : number= map_position.current.lng;
        let options :object = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: map_level.current,
        };
        const map = new window.kakao.maps.Map(container, options);
        map.setMaxLevel(10);
        kakao_map.current = map;
    }, []);

 
    //지도 레벨을 조정하는 함수
    const zoomMap = useCallback((type : Zoom) => {
        let level = kakao_map.current.getLevel();
        level = type === 'in' ? level - 1 : level + 1;
        kakao_map.current.setLevel(level, {animate: {duration: 300}});
        localStorage.setItem('level', level);
        dispatch(setLevel(level));
        
    },[dispatch]);

    // 맵 중심좌표를 설정하는 함수
    const setCoordinates = useCallback((lat:number, lng : number) => {
        const moveLatLon = new window.kakao.maps.LatLng(lat, lng);
        kakao_map.current.setCenter(moveLatLon);
    }, []);


    //매물 마커를 생성하는 함수
    const createParkingMarker = useCallback(() => {
        // onLoading('parking/GET_LIST');
        if (cluster_marker.current !== null) {
            cluster_marker.current.clear();
        }
        const map = kakao_map.current;

        cluster_marker.current = new window.kakao.maps.MarkerClusterer({
            map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
            averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel: 5, // 클러스터 할 최소 지도 레벨
            disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
            styles: [
                {
                    // calculator 각 사이 값 마다 적용될 스타일을 지정한다
                    width: '40px',
                    height: '40px',
                    background: 'rgba(34, 34, 34, .8)',
                    borderRadius: '30px',
                    color: '#fff',
                    border: '1px solid white',
                    boxSizing: 'border-box',
                    fontSize: '15px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    lineHeight: '40px',
                },
            ],
        });

        //맵의 중심좌표가 변경되었을 시 이벤트
        window.kakao.maps.event.addListener(map, 'center_changed', () => {
            const level = map.getLevel();
            const latlng = map.getCenter();
            map_level.current = level;
      
            map_position.current.lat = latlng.getLat();
            map_position.current.lng = latlng.getLng();
            const { lat, lng } = map_position.current;
            // dispatch(get_area({ lat, lng }));
            // const new_position = { lat, lng };
            const new_position = { lat, lng };
            localStorage.setItem('position', JSON.stringify(new_position));
            localStorage.setItem('level', level);
            setZoneButtonOpen(false);
            // setTimeout(()=>{
            //     setZoneList([]);
            // },200)
            zone_view.current =false;
        });


        // const markdata = realties.filter((item) => {
        //     return (
        //         item.addr.indexOf(area['type1']) !== -1 ||
        //         item.addr.indexOf(area['type2']) !== -1
        //     );
        // });
        // 마커 생성
        // 스토리지에서 마지막 user_position을 기준으로 마커데이터 생성 ex) 대구좌표 -> 대구 주변 렌더

        // const storage_position = JSON.parse(sessionStorage.getItem('user_position'));
        if (true) {
            const data = realties.map((el : any) => {
                const content = `<div onclick="onClickOverlay(${
                    el.realty_id
                })" class="custom-overlay" title=${JSON.stringify(
                    el,
                )} ></div>`;
                var customOverlay = new window.kakao.maps.CustomOverlay({
                    map: map,
                    position: new window.kakao.maps.LatLng(el.lat, el.lng),
                    content: content,
                    yAnchor: 1,
                    clickable: true,
                    zIndex: 1600,
                });
                customOverlay.setMap(map);
                return customOverlay;
            });
            cluster_marker.current.addMarkers(data);

            /*
                클러스터 클릭이벤트
                클러스트를 클릭하면 슬라이드 메뉴 생성
                10개 이상이면 지도 줌 인
            */
            window.kakao.maps.event.addListener(
                cluster_marker.current,
                'clusterclick',
                (cluster : any ) => {
                    const overlays = cluster.getMarkers();
                    if (overlays.length > 10) {
                        var level = map.getLevel() - 1;
                        map.setLevel(level, {
                            anchor: cluster.getCenter(),
                            animate: 300,
                        });
                    } else {
                        zone_view.current = !zone_view.current;
                        const zoneList = overlays.map((overlay:any) => {
                            const data = overlay.getContent();
                            const t_index = data.indexOf('title=');
                            const close_index = data.indexOf('>');
                            const str = data.substring(
                                t_index + 6,
                                close_index,
                            );
                            return JSON.parse(str);
                        });

                        dispatch(setZone(zoneList));
                        setZoneButtonOpen(zone_view.current)
                    }
                },
            );
        }
        // 윈도우 클릭이벤트 넘겨야 하는 주차장 마커 클릭함수
        window.onClickOverlay = (realty_id:string|number) => {
            history.push(RoutePaths.main.detail + '/' + realty_id);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [area, dispatch, history, realties]);

    //주소 검색 API
    const onSearchAddr = useCallback(async()=>{
        try{
            const res = await searchAddress(addr);
            console.log(res);
            if(res){
                setAddrList(res);
            }
            else{
                setAddrList([]);
            }
        }  
        catch(e){
            console.log(e);
        }
    },[addr])

    
    // 주소 클릭시 메인화면으로 이동
    const onClickAddr = useCallback(async (jibun:string)=>{
        try{
            const res = await requestGetAddressInfo(jibun);
            if(res.data.documents){
                const{x,y} = res.data.documents[0];
                setCoordinates(y,x);
                kakao_map.current.setLevel(3, {animate: {duration: 300}});
                localStorage.setItem('level', '3');
                dispatch(setLevel(3));
                history.replace(RoutePaths.main.index);
            }
        }
        catch(e){
            console.log(e);
        }
    },[])

    // 마지막 위치 기준으로 get_area 함수 호출하여 해당지역 받아오기
    useEffect(() => {
        let storage  =localStorage.getItem('position');
        if(storage){
            let item = JSON.parse(storage);
            map_position.current.lat= item.lat;
            map_position.current.lng= item.lng;
        }
        let lv = localStorage.getItem('level');
        if(lv){
           map_level.current= parseInt(lv);
        }
        // if (storage_position && storage_position.lat && storage_position.lng) {
        //     map_position.current = storage_position;
        //     const { lat, lng } = map_position.current;
        //     dispatch(get_area({ lat, lng }));
        // } else {
        //     const init_position = {
        //         lat: 35.8360328674316,
        //         lng: 128.5743408203125,
        //     };
        //     map_position.current = init_position;
        //     const { lat, lng } = init_position;
        //     localStorage.setItem('position', JSON.stringify(init_position));
        //     dispatch(get_area({ lat, lng }));
        // }
    }, []);


    useEffect(()=>{
        dispatch(getRealties({lat:0,lng:0,filter:[1,2,3,4],access_token}));
    },[dispatch])

    // 지도 렌더
    useEffect(()=>{
        mapRender();
    },[])

    // 매물 마커 생성
    useEffect(()=>{
        createParkingMarker();
    },[realties])


    // 주소 모달 검색
    useEffect(()=>{
        onSearchAddr();
    },[onSearchAddr])


    // 모달이 꺼졌을 시 초기화
    useEffect(()=>{
        setAddr('');
    },[modal])

    return(
        <Fragment>
        <div className={styles['container']}>
            <div className={styles['app-bar']}>
                <div className={styles['app-bar-text']}>
                    <ButtonBase className={styles['text']} onClick={()=>history.push(`${RoutePaths.main.index}/address`)}>
                         어떤 지역을 찾고계신가요?
                    </ButtonBase>
                </div>
                <div className={styles['app-bar-icon']}>
                    <IconButton className={styles['icon']}  onClick={()=>history.push(`${RoutePaths.main.index}/address`)}>
                        <img src={SEARCH}/>
                    </IconButton>
                    <IconButton className={styles['icon']} onClick={()=>handleOpen(true)}>
                        <img src={MENU}/>
                    </IconButton>
                </div>
            </div>
            <div className={styles['left-bar']}>
                <CircleButton src={ZOOMIN} onClick={()=>zoomMap('in')}/>
                <CircleButton src={ZOOMOUT} onClick={()=>zoomMap('out')}/>
            </div>
            <div className={styles['right-bar']}>
                <CircleButton src={FILTER} onClick={()=>handleFilterOpen(true)}/>
                <CircleButton src={LOCATION}/>
            </div>
            <SlideMenu open={menuOpen} handleClose={()=>handleOpen(false)}/>
            <Button className={cx('zone-button',{open:zoneButtonOpen})} onClick={()=>history.push(RoutePaths.main.index+'/zone')}>이지역 매물 {`${zone_list.length}`}개 보기</Button>
            <div id="map" style={{ width: '100%', height: '100vh', zIndex: 1 }}/>
        </div>
        <AddressModal open={modal==='address'} addr={addr}  onChange={(e)=> setAddr(e.target.value)} list={addrList} onClick={onClickAddr}/>
        <ZoneModal open={modal==='zone'} realties={zone_list}/>
        <BottomModal open ={filterOpen} handleClose={()=>handleFilterOpen(false)}/>
        </Fragment>

    )
}


export default MapContainer;