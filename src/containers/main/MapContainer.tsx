
/* 지도 페이지 */

type Props={
    modal? : string | undefined
}

function MapContainer({modal}:Props){
    console.log(modal);
    return(
        <div>
           지도
        </div>
    )
}


export default MapContainer;