import EventContainer from '../../containers/main/EventContainer';
import {RouteComponentProps} from 'react-router-dom';
import {IMatchId} from '../../types/RouterParams';


function EventPage({match} : RouteComponentProps<IMatchId>){

    const {id}= match.params;
    return(
        <EventContainer id={id}/>
    )
}

export default EventPage;