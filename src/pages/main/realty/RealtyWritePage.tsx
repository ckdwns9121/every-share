import RealtyWriteContainer from '../../../containers/main/realty/RealtyWriteContainer';
import {RouteComponentProps} from 'react-router-dom';
import {IMatchId} from '../../../types/RouterParams';

function RealtyWritePage({match} : RouteComponentProps<IMatchId>){

    const {id,modal} = match.params;

    console.log(match);
    return(
        <RealtyWriteContainer id={id}/>
    )
}

export default RealtyWritePage;