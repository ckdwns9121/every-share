import { useEffect } from 'react';
import DetailContainer from '../../containers/main/DetailContainer';
import { RouteComponentProps } from 'react-router-dom';
import { IMatchId } from '../../types/RouterParams';

function DetailPage({ match }: RouteComponentProps<IMatchId>) {
  const { id, modal } = match.params;

  useEffect(() => {
    return () => {
      let url: any = sessionStorage.getItem('url');
      if (url) {
        url = JSON.parse(url);
        const scrollTop = sessionStorage.getItem('prev');
        if (url.prev?.indexOf(url.prev) !== -1 && scrollTop) {
          sessionStorage.setItem('last_pos', scrollTop);
        }
      }
    };
  }, []);
  return <DetailContainer id={id} modal={modal} />;
}

export default DetailPage;
