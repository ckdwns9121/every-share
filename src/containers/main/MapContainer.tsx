

import {useCallback, useEffect,useRef,useState, useReducer,Fragment} from 'react';
import styles from './MapContainer.module.scss';
import '../../styles/_Overlay.scss';
//lib
import {RoutePaths} from '../../core/utils/path';

//types
import {MatchModal} from '../../types/RouterParams';

//hooks
import {useSelector , useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

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

//lib
import {getDistanceFromLatLonInKm} from '../../core/lib/distance';

import { searchAddress,requestGetAddressInfo } from '../../api/address';


//type
import {Address} from '../../types/Address';

declare global {
    interface Window {
      kakao: any;
      onClickOverlay : (realty_id : string)=>void
    }
}

type Zoom = 'in' | 'out';


function MapContainer({modal}:MatchModal){

    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [filterOpen ,setFilterOpen] = useState<boolean>(false);
    const handleOpen =(type:boolean)=> setMenuOpen(type);
    const handleFilterOpen =(type:boolean) =>setFilterOpen(type);
    const history = useHistory();
    const dispatch = useDispatch();
    const {position,level,area,address} = useSelector((state:RootState) =>state.map);
    const {realties} = useSelector((state:RootState) =>state.realties);
    const kakao_map = useRef<any>(null); //카카오 맵
    const map_position = useRef<any>({lat:33.450701, lng: 126.570667}); //지도 첫렌더시 좌표
    const map_level = useRef<number>(5); // 디폴트 레벨 -> //4 : 100m 6: 500m 7:1km
    const cluster_marker = useRef<any>(null);

    const [addr , setAddr] = useState<string>(''); //주소검색
    const [addrList,setAddrList] = useState<Address[] | null>(null);


    // 지도를 렌더하는 함수
    const mapRender = useCallback(() => {
        let container = document.getElementById('map');
        let lat : number = map_position.current.lat;
        let lng : number= map_position.current.lng;
        let options :object = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: level !== 0 ? level : map_level.current,
        };
        const map = new window.kakao.maps.Map(container, options);
        map.setMaxLevel(8);
        kakao_map.current = map;
    }, []);


    //지도 레벨을 조정하는 함수
    const zoomMap = useCallback((type : Zoom) => {
        let level = kakao_map.current.getLevel();
        level = type === 'in' ? level - 1 : level + 1;
        kakao_map.current.setLevel(level, {animate: {duration: 300}});
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
                // const distance = getDistanceFromLatLonInKm(
                //     el.lat,
                //     el.lng,
                //     storage_position.lat,
                //     storage_position.lng,
                // );
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
            console.log('클러스터 생성');
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
                    console.log('클러스터 클릭');
                    if (overlays.length > 10) {
                        var level = map.getLevel() - 1;
                        map.setLevel(level, {
                            anchor: cluster.getCenter(),
                            animate: 300,
                        });
                    } else {
                        // slide_view.current = !slide_view.current;

                        const slides = overlays.map((overlay:any) => {
                            const data = overlay.getContent();
                            const t_index = data.indexOf('title=');
                            const close_index = data.indexOf('>');
                            const str = data.substring(
                                t_index + 6,
                                close_index,
                            );
                            return JSON.parse(str);
                        });
                        console.log(slides);
                        // setSlideList(slides);
                        // setOnSlide(slide_view.current);
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

    useEffect(()=>{
        let container = document.getElementById('map');
        let options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3
        };
        let map = new window.kakao.maps.Map(container, options);
        kakao_map.current = map;
    },[])

    useEffect(()=>{
        createParkingMarker();
    },[realties])

    useEffect(()=>{
        onSearchAddr();
    },[onSearchAddr])

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
            <div id="map" style={{ width: '100%', height: '100vh', zIndex: 1 }}/>
        </div>
        <AddressModal open={modal==='address'} addr={addr}  onChange={(e)=> setAddr(e.target.value)} list={addrList}/>
        <BottomModal open ={filterOpen} handleClose={()=>handleFilterOpen(false)}/>
        </Fragment>

    )
}


export default MapContainer;