import RealtyWriteContainer from '../../../containers/main/realty/RealtyWriteContainer';
import {RouteComponentProps} from 'react-router-dom';

interface Props{
    id?:string
}

function RealtyWritePage({match} : RouteComponentProps<Props>){

    const {id} = match.params;

    return(
        <RealtyWriteContainer id={id}/>
    )
}

export default RealtyWritePage;