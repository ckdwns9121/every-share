/* 찜한 매물 페이지 */

import styles from './LikeContainer.module.scss';
import RealtyList from '../../components/item/RealtyList';
function LikeContainer(){
    return(
        <div className={styles['container']}>
            <div className={styles['content']}>
                <RealtyList/>
            </div>
        </div>
    )
}

export default LikeContainer;