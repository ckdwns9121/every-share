import DetailContainer from '../../containers/main/DetailContainer';
import {RouteComponentProps} from 'react-router-dom';
import {MatchId} from '../../types/RouterParams';

function DetailPage({match} : RouteComponentProps<MatchId>){

    const {id,modal} = match.params;
    return(
        <DetailContainer id={id} modal={modal}/>
    )
}

export default DetailPage;