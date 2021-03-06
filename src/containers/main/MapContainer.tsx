/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState, Fragment } from 'react';
import styles from './MapContainer.module.scss';
import cn from 'classnames/bind';
import '../../styles/_Overlay.scss';
import { Button } from '@material-ui/core';
//lib
import { RoutePaths } from '../../core/utils/path';

//types
import { IMatchModal } from '../../types/RouterParams';
import { IAddress } from '../../types/Address';

//hooks
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useToken } from '../../hooks/useStore';
import useDebounced from '../../hooks/useDebounced';

//store
import { RootState } from '../../store';
import { setLevel } from '../../store/map';
import { getRealties } from '../../store/realties';
import { setZone } from '../../store/zone';

//api
import { searchAddress, requestGetAddressInfo } from '../../api/address';

//components
import CircleButton from '../../components/button/CircleButton';
import { IconButton, ButtonBase } from '@material-ui/core';
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
import ZoneModal from '../../components/modal/ZoneModal';

const cx = cn.bind(styles);

declare global {
  interface Window {
    kakao: any;
    onClickOverlay: (realty_id: string) => void;
  }
}

type Zoom = 'in' | 'out';

function MapContainer({ modal }: IMatchModal) {
  const access_token = useToken();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const sliderMenuOpen = (type: boolean) => setMenuOpen(type);
  const handleFilterOpen = (type: boolean) => setFilterOpen(type);
  const history = useHistory();
  const dispatch = useDispatch();
  const { level } = useSelector((state: RootState) => state.map);
  const { oneroom, tworoom, op, duplex } = useSelector((state: RootState) => state.filters);
  const { realties } = useSelector((state: RootState) => state.realties);
  const { zone_list } = useSelector((state: RootState) => state.zone);
  const kakao_map = useRef<any>(null); //????????? ???
  const map_position = useRef<any>({ lat: 33.450701, lng: 126.570667 }); //?????? ???????????? ??????
  const map_level = useRef<number>(5); // ????????? ?????? -> //4 : 100m 6: 500m 7:1km
  const cluster_marker = useRef<any>(null);
  const [addr, setAddr] = useState<string>(''); //????????????
  const [addrList, setAddrList] = useState<IAddress[] | null>(null);
  const zone_view = useRef<boolean>(false); // ?????? ?????? ?????? ??????
  const [zoneOpen, setZoneOpen] = useState<boolean>(false);

  const debounceSearchTerm = useDebounced(addr, 500);

  /* ????????? ???????????? ?????? */
  const mapRender = useCallback(() => {
    let container = document.getElementById('map');
    let lat: number = map_position.current.lat;
    let lng: number = map_position.current.lng;
    let options: object = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: map_level.current,
    };
    const map = new window.kakao.maps.Map(container, options);
    map.setMaxLevel(13);
    kakao_map.current = map;

    /* ?????? ??????????????? ??????????????? ??? ????????? */
    window.kakao.maps.event.addListener(map, 'center_changed', () => {
      const lv = map.getLevel();
      const latlng = map.getCenter();
      map_level.current = lv;

      map_position.current.lat = latlng.getLat();
      map_position.current.lng = latlng.getLng();
      const { lat, lng } = map_position.current;
      // dispatch(get_area({ lat, lng }));
      // const new_position = { lat, lng };
      const new_position = { lat, lng };
      localStorage.setItem('position', JSON.stringify(new_position));
      localStorage.setItem('level', lv);
      setZoneOpen(false);
      dispatch(setLevel(lv));
      zone_view.current = false;
    });
  }, []);

  /* ?????? ????????? ???????????? ?????? */
  const zoomMap = useCallback(
    (type: Zoom) => {
      let level = kakao_map.current.getLevel();
      level = type === 'in' ? level - 1 : level + 1;
      kakao_map.current.setLevel(level, { animate: { duration: 300 } });
      localStorage.setItem('level', level);
      dispatch(setLevel(level));
    },
    [dispatch]
  );

  /* ??? ??????????????? ???????????? ?????? */
  const setCoordinates = useCallback((lat: number, lng: number) => {
    const moveLatLon = new window.kakao.maps.LatLng(lat, lng);
    kakao_map.current.setCenter(moveLatLon);
  }, []);

  /* ?????? ????????? ???????????? ?????? */
  const createParkingMarker = () => {
    // onLoading('parking/GET_LIST');
    if (cluster_marker.current !== null) {
      cluster_marker.current.clear();
    }
    const map = kakao_map.current;

    cluster_marker.current = new window.kakao.maps.MarkerClusterer({
      map: map, // ???????????? ??????????????? ???????????? ????????? ?????? ??????
      averageCenter: true, // ??????????????? ????????? ???????????? ?????? ????????? ???????????? ?????? ????????? ??????
      minLevel: 1, // ???????????? ??? ?????? ?????? ??????
      disableClickZoom: true, // ???????????? ????????? ???????????? ??? ????????? ???????????? ????????? ????????????
      styles: [
        {
          // calculator ??? ?????? ??? ?????? ????????? ???????????? ????????????
          width: '40px',
          height: '40px',
          background: 'rgba(34, 34, 34, .8)',
          // background: '#0066ff',
          borderRadius: '30px',
          color: '#fff',
          // border: '0.5px solid white',
          boxSizing: 'border-box',
          fontSize: '15px',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '40px',
          opacity: '0.95',
        },
      ],
    });

    /* ??????????????? ?????? ?????? */
    cluster_marker.current.setMinClusterSize(1);

    const data = realties.map((el: any) => {
      const content = `<div title=${JSON.stringify(el)} ></div>`;
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

    window.kakao.maps.event.addListener(cluster_marker.current, 'clusterclick', (cluster: any) => {
      const overlays = cluster.getMarkers();

      if (overlays.length > 10 || map_level.current > 11) {
        var level = map.getLevel() - 1;
        map.setLevel(level, {
          anchor: cluster.getCenter(),
          animate: 300,
        });
      } else {
        zone_view.current = true;
        const zoneList = overlays.map((overlay: any) => {
          const data = overlay.getContent();
          const t_index = data.indexOf('title=');
          const close_index = data.indexOf('>');
          const str = data.substring(t_index + 6, close_index);
          return JSON.parse(str);
        });

        dispatch(setZone(zoneList));
        setZoneOpen(zone_view.current);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  /* ?????? ?????? ?????? */
  const onSearchAddr = useCallback(async address => {
    try {
      const res = await searchAddress(address);
      if (res) {
        setAddrList(res);
      } else {
        setAddrList([]);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  /* ?????? ????????? ?????? ????????? ??? ?????? ?????? */
  const onClickAddr = useCallback(async (jibun: string) => {
    try {
      const res = await requestGetAddressInfo(jibun);
      if (res.data.documents) {
        const { x, y } = res.data.documents[0];
        setCoordinates(y, x);
        kakao_map.current.setLevel(3, { animate: { duration: 300 } });
        localStorage.setItem('level', '3');
        dispatch(setLevel(3));
        history.replace(RoutePaths.main.index);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    onSearchAddr(debounceSearchTerm);
  }, [debounceSearchTerm]);

  /* ????????? ?????? ???????????? get_area ?????? ???????????? ???????????? ???????????? */
  useEffect(() => {
    let storage = localStorage.getItem('position');
    if (storage) {
      let item = JSON.parse(storage);
      map_position.current.lat = item.lat;
      map_position.current.lng = item.lng;
    }
    let lv = localStorage.getItem('level');
    if (lv) {
      map_level.current = parseInt(lv);
    }
  }, []);

  useEffect(() => {
    let newArray: number[] = [];
    [oneroom, tworoom, op, duplex].forEach((item, index) => {
      if (item === true) {
        newArray.push(index + 1);
      }
    });
    dispatch(getRealties({ lat: 0, lng: 0, filter: newArray, access_token }));
  }, [oneroom, tworoom, op, duplex]);

  /* ?????? ?????? */
  useEffect(() => {
    mapRender();
  }, []);

  /* ?????? ?????? ?????? */
  useEffect(() => {
    createParkingMarker();
  }, [realties, level]);

  /* ????????? ????????? ??? ????????? */
  useEffect(() => {
    setAddr('');
  }, [modal]);

  return (
    <Fragment>
      <div className={styles['container']}>
        <div className={styles['app-bar']}>
          <div className={styles['app-bar-text']}>
            <ButtonBase className={styles['text']} onClick={() => history.push(`${RoutePaths.main.index}/address`)}>
              ?????? ????????? ???????????????????
            </ButtonBase>
          </div>
          <div className={styles['app-bar-icon']}>
            <IconButton className={styles['icon']} onClick={() => history.push(`${RoutePaths.main.index}/address`)}>
              <img src={SEARCH} alt="search" />
            </IconButton>
            <IconButton
              className={styles['icon']}
              onClick={() => {
                setZoneOpen(false);
                sliderMenuOpen(true);
              }}
            >
              <img src={MENU} alt="menu" />
            </IconButton>
          </div>
        </div>
        <div className={styles['left-bar']}>
          <CircleButton src={ZOOMIN} onClick={() => zoomMap('in')} />
          <CircleButton src={ZOOMOUT} onClick={() => zoomMap('out')} />
        </div>
        <div className={styles['right-bar']}>
          <CircleButton src={FILTER} onClick={() => handleFilterOpen(true)} />
          <CircleButton src={LOCATION} />
        </div>
        <SlideMenu open={menuOpen} handleClose={() => sliderMenuOpen(false)} />
        <Button className={cx('zone-button', { open: zoneOpen })} onClick={() => history.push(RoutePaths.main.index + '/zone')}>
          ????????? ?????? {`${zone_list.length}`}??? ??????
        </Button>
        <div id="map" style={{ width: '100%', height: '100vh', zIndex: 1 }} />
      </div>
      <AddressModal open={modal === 'address'} addr={addr} onChange={e => setAddr(e.target.value)} list={addrList} onClick={onClickAddr} />
      <ZoneModal open={modal === 'zone'} realties={zone_list} />
      <BottomModal open={filterOpen} handleClose={() => handleFilterOpen(false)} />
    </Fragment>
  );
}

export default MapContainer;
