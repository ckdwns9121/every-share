import DetailContainer from '../../containers/main/DetailContainer';
import {RouteComponentProps} from 'react-router-dom';
import {IMatchId} from '../../types/RouterParams';

function DetailPage({match} : RouteComponentProps<IMatchId>){

    const {id,modal} = match.params;
    return(
        <DetailContainer id={id} modal={modal}/>
    )
}

export default DetailPage;