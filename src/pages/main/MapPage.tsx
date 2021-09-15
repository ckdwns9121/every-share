import MapContainer from '../../containers/main/MapContainer';
import {RouteComponentProps} from 'react-router-dom';
import {IMatchModal} from '../../types/RouterParams';

function MapPage({match} : RouteComponentProps<IMatchModal>){

    const {modal} = match.params;
    
    return(
        <MapContainer modal={modal}/>
    )
}

export default MapPage;