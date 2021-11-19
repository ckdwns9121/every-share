/* 이름 업데이트 페이지 */
import { useState, useEffect } from 'react';
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

//store
import { update } from '../../../store/user';
import { useLoading, useSnackbar } from '../../../hooks/useAsset';
function UpdateNameContainer() {
  const [name, setName] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const access_token = useToken();
  const { handleLoading } = useLoading();
  const { handleOpen, handleClose } = useSnackbar();

  const onClickButton = async () => {
    try {
      if (access_token) {
        handleLoading(true);
        const res = await updateUserName(access_token, name);
        console.log(res);
        if (res.status === 200) {
          dispatch(update({ name: 'name', value: name }));
          handleOpen('성공적으로 변경되었습니다.', true, false, 'success');
        }
        handleLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    return () => {
      handleClose();
    };
  }, []);
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
