import LikeContainer from '../../containers/main/LikeContainer';
import {usePostion} from '../../hooks/useScroll';
function LikePage(){
    usePostion('/realty/like');
    return(
        <LikeContainer />
    )
}

export default LikePage;