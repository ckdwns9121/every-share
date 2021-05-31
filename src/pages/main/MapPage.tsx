import MapContainer from '../../containers/main/MapContainer';
import {RouteComponentProps} from 'react-router-dom';

type IProps= {
    modal?: string | undefined
}

function MapPage({match} : RouteComponentProps<IProps>){
    const {modal} = match.params;
    console.log(modal);
    return(
        <MapContainer modal={modal}/>
    )
}

export default MapPage;