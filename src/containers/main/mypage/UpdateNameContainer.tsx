/* 이름 업데이트 페이지 */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RoutePaths } from '../../../core/utils/path';
import Layout from '../../../components/layout/Layout';
import BasicButton from '../../../components/button/BasicButton';
import styles from './UpdateNameContainer.module.scss';

//api
import { updateUserName } from '../../../api/users';
//hooks
import { useToken } from '../../../hooks/useStore';
import { useDispatch } from 'react-redux';

function UpdateNameContainer() {
  const [name, setName] = useState('');

  const history = useHistory();
  const access_token = useToken();

  const onClickButton = async () => {
    try {
      if (access_token) {
        const res = await updateUserName(access_token, name);
        console.log(res);
        if (res.status === 200) {
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Layout>
      <div className={styles['wrapper']}>
        <div className={styles['input-box']}>
          <input
            type="text"
            name="email"
            placeholder={'이름을 입력해주세요'}
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className={styles['button']}>
          <BasicButton name={'변경'} onClick={() => onClickButton()} />
        </div>
      </div>
    </Layout>
  );
}

export default UpdateNameContainer;
