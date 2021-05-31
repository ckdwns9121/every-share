import RealtyWriteContainer from '../../../containers/main/realty/RealtyWriteContainer';
import {RouteComponentProps} from 'react-router-dom';
import {MatchModal} from '../../../types/RouterParams';

function RealtyWritePage({match} : RouteComponentProps<MatchModal>){

    return(
        <RealtyWriteContainer/>
    )
}

export default RealtyWritePage;