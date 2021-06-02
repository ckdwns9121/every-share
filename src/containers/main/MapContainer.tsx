

import {useCallback, useEffect,useRef,useState, useReducer,Fragment} from 'react';
import styles from './MapContainer.module.scss';

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

//modal
import AddressModal from '../../components/modal/AddressModal';

declare global {
    interface Window {
      kakao: any;
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
    const kakao_map = useRef<any>(null); //카카오 맵
    const map_position = useRef<any>(null); //지도 첫렌더시 좌표
    const map_level = useRef<number>(5); // 디폴트 레벨 -> //4 : 100m 6: 500m 7:1km



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
    
    useEffect(()=>{
        let container = document.getElementById('map');
        let options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3
        };
        let map = new window.kakao.maps.Map(container, options);
        kakao_map.current = map;
    },[])

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
                    <IconButton className={styles['icon']}>
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
        <AddressModal open={modal==='address'}/>
        <BottomModal open ={filterOpen} handleClose={()=>handleFilterOpen(false)}/>
        </Fragment>

    )
}


export default MapContainer;