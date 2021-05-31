/* 매물 상세보기 페이지 */


type Props= {
    id : string
}

function DetailContainer({id}:Props){
    console.log(id);
    return(
        <div>
            매물 상세보기
        </div>
    )
}


export default DetailContainer;