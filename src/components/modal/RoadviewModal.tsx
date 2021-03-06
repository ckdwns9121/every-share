/*global kakao*/

import React, { useEffect/*, useState, useRef*/ } from 'react';

//styles

import cn from 'classnames/bind';
//components
import Header from '../header/Header';

import styles from './RoadviewModal.module.scss';

const cx = cn.bind(styles);


type Props={
    open : boolean,
    lat : number| null,
    lng : number| null,
}

function RoadviewModal ({open,lat,lng} : Props) {

    useEffect(() => {
        if(lat && lng){
            roadView(lat,lng);
        }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lat,lng]);

    const roadView = (lat:number , lng:number) => {
      
        var roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
        var roadview = new window.kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
        var roadviewClient = new window.kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

        var position = new window.kakao.maps.LatLng(lat,lng);

        // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
        roadviewClient.getNearestPanoId(position, 50, function (panoId : any) {
            roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
        });
    };
    return (
        <div className={cx('modal', { open: open })}>
            <div className={styles['container']}>
                <div
                    id="roadview"
                    style={{ width: '100vw', height: '100vh', zIndex: 1 }}
                />
            </div>
        </div>
    );
};

export default RoadviewModal;
