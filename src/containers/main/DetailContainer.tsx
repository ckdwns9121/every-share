/* 매물 상세보기 페이지 */


import {MatchId} from '../../types/RouterParams';
function DetailContainer({id}:MatchId){
    console.log(id);
    return(
        <div>
            매물 상세보기
        </div>
    )
}


export default DetailContainer;