import EventContainer from '../../containers/main/EventContainer';
import {RouteComponentProps} from 'react-router-dom';

type IProps= {
    id: string 
}
function EventPage({match} : RouteComponentProps<IProps>){

    const {id}= match.params;
    return(
        <EventContainer id={id}/>
    )
}

export default EventPage;