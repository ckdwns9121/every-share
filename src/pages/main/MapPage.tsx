import MapContainer from '../../containers/main/MapContainer';
import {RouteComponentProps} from 'react-router-dom';
import {MatchModal} from '../../types/RouterParams';

function MapPage({match} : RouteComponentProps<MatchModal>){

    const {modal} = match.params;
    
    return(
        <MapContainer modal={modal}/>
    )
}

export default MapPage;