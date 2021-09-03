import RealtyWriteContainer from '../../../containers/main/realty/RealtyWriteContainer';
import {RouteComponentProps} from 'react-router-dom';
import {MatchId} from '../../../types/RouterParams';

function RealtyWritePage({match} : RouteComponentProps<MatchId>){

    const {id,modal} = match.params;

    console.log(match);
    return(
        <RealtyWriteContainer id={id}/>
    )
}

export default RealtyWritePage;