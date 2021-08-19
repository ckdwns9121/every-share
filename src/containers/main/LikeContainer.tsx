/* 찜한 매물 페이지 */

import styles from './LikeContainer.module.scss';
import RealtyList from '../../components/item/RealtyList';
import Layout from '../../components/layout/Layout';

function LikeContainer(){
    return(
        <Layout>
                <RealtyList/>
        </Layout>
    )
}

export default LikeContainer;