/* 이벤트 페이지 */

import Layout from '../../components/layout/Layout';
import {IMatchId} from '../../types/RouterParams';
import Like from '../../components/asset/Like';
function EventContainer({id}:IMatchId){
    return(
        <Layout>
         <Like on={true} onClick={()=>{}}/>
        </Layout>
    )
}


export default EventContainer;