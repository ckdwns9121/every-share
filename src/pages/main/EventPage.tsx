import EventContainer from '../../containers/main/EventContainer';
import {RouteComponentProps} from 'react-router-dom';
import {MatchId} from '../../types/RouterParams';


function EventPage({match} : RouteComponentProps<MatchId>){

    const {id}= match.params;
    return(
        <EventContainer id={id}/>
    )
}

export default EventPage;