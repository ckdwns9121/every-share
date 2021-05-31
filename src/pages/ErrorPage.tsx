import {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

type Props={
    path? : string
}

function ErrorPage ({path} : Props){
    const history = useHistory();
    useEffect(()=>{
        if(path) history.replace(path);
    },[path])
    return(
    <div>
        에러페이지
    </div>
    )

}
export default ErrorPage