import DetailContainer from '../../containers/main/DetailContainer';
import {RouteComponentProps} from 'react-router-dom';

type IProps= {
    id: string 
}
function DetailPage({match} : RouteComponentProps<IProps>){
    const {id} = match.params;
    return(
        <DetailContainer id={id}/>
    )
}

export default DetailPage;