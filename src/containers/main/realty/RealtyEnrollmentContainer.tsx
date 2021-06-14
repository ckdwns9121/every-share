import styles from './RealtyEnrollmentContainer.module.scss';
import {Button} from '@material-ui/core';
import {RoutePaths} from '../../../core/utils/path';
import {useHistory} from 'react-router-dom';

import RealtyList from '../../../components/item/RealtyList';


function RealtyEnrollmentContainer(){
    
    const history = useHistory();

    return(
        <div className={styles['container']}>
            <div className={styles['content']}>
                <Button className={styles['enrollment-button']} onClick={()=>history.push(RoutePaths.main.realty.write)}>
                    매물 등록하기
                </Button>
                <div className={styles['list']}>
                <RealtyList></RealtyList>
                </div>
            </div>
        </div>
    )
}


export default RealtyEnrollmentContainer;