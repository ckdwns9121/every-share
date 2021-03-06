import styles from './RealtyEnrollmentContainer.module.scss';
import { Button } from '@material-ui/core';
import { RoutePaths } from '../../../core/utils/path';
import RealtyList from '../../../components/item/RealtyList';
import Layout from '../../../components/layout/Layout';
//hooks
import { useToken } from '../../../hooks/useStore';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useLoading } from '../../../hooks/useAsset';
import useMessage from '../../../hooks/useMessage';

//api
import { requsetMyRealtyList } from '../../../api/realty';
//type
import { IRealty } from '../../../types/Realty';

function RealtyEnrollmentContainer() {
  const history = useHistory();
  const access_token = useToken();
  const [realties, setRealties] = useState<IRealty[]>([]);
  const { handleLoading } = useLoading();

  const emptyMessage = useMessage();

  const callGetApiMyRealtyList = async () => {
    try {
      if (access_token) {
        handleLoading(true);
        const res = await requsetMyRealtyList(access_token);
        if (res?.data?.message === 'success') {
          setRealties(res.data.my_realties);
        }
        handleLoading(false);
      }
    } catch (e) {
      console.log(e);
      handleLoading(false);
    }
  };

  useEffect(() => {
    callGetApiMyRealtyList();
  }, []);

  return (
    <Layout>
      <Button className={styles['enrollment-button']} onClick={() => history.push(RoutePaths.main.realty.write)}>
        방 등록하기
      </Button>
      <div className={styles['list']} style={{ marginTop: '20px' }}>
        {realties && <RealtyList realties={realties} msg={emptyMessage()} />}
      </div>
    </Layout>
  );
}

export default RealtyEnrollmentContainer;
