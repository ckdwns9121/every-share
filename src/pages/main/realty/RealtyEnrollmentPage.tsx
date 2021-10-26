import { useEffect } from 'react';
import RealtyEnrollmentContainer from '../../../containers/main/realty/RealtyEnrollmentContainer';
import {usePostion} from '../../../hooks/useScroll';

function RealtyEnrollmentPage (){
    usePostion('/realty/enrollment');
    return(
        <RealtyEnrollmentContainer/>
    )
}

export default RealtyEnrollmentPage;