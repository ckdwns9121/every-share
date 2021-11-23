import styles from './RealtyList.module.scss';
import { ButtonBase, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

//asset
import TEST_IMAGE from '../../static/image/test.png';
import { RoutePaths } from '../../core/utils/path';
import Like from '../asset/Like';
import Empty from '../asset/Empty';

//type
import { IRealty } from '../../types/Realty';

import { dateToYYYYMMDD, imageFormat } from '../../core/lib/formatChecker';

type Icon = 'like' | 'contact' | 'delete' | 'none';

interface Relties {
  realties?: IRealty[];
  icon?: Icon;
  msg?: string;
}

interface Props extends IRealty {
  icon?: Icon;
}

function RealtyItemList({ realties, icon, msg }: Relties) {
  const list = realties?.map(item => (
    <RealtyItem {...item} key={item.realty_id} icon={icon} />
  ));
  return <>{list?.length !== 0 ? list : <Empty msg={msg} />}</>;
}

function RealtyItem(props: Props) {
  const sumbnail = JSON.parse(props.realty_images);
  return (
    <Link to={`${RoutePaths.main.detail}/${props.realty_id}`}>
      <div className={styles['realty-item']}>
        <div
          className={styles['realty-img']}
          style={{
            backgroundImage: `url(${imageFormat(sumbnail[0])})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {props.icon === 'like' && (
            <div className={styles['like']}>
              <Like on={props.isLiked} onClick={() => {}} />
            </div>
          )}
        </div>
        <div className={styles['realty-info']}>
          <div className={styles['realty-price']}>
            월세 {`${props.deposit}/${props.monthly_rent}`}
          </div>
          <div className={styles['realty-name']}>{props.realty_name}</div>
          <div className={styles['realty-date']}>
            {`${dateToYYYYMMDD(new Date(props.oper_start_time))}`} ~{' '}
            {`${dateToYYYYMMDD(new Date(props.oper_end_time))}`}까지
          </div>
          <div className={styles['realty-comment']}>{props.realty_comment}</div>
        </div>
        <div className={styles['badge']}>집주인 허가</div>
      </div>
    </Link>
  );
}

export default RealtyItemList;
