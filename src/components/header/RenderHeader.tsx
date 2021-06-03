import Header from "./Header";
import { RoutePaths, RouteTitle } from "../../core/utils/path";
import { useLocation } from "react-router";

const RenderHeader = () => {

  const {pathname} = useLocation();
  // 로그인
  if (pathname === RoutePaths.auth.signin) {
    return <Header title={RouteTitle.auth.signin} />;
  }
  // 회원가입
  // else if (pathname === RoutePaths.auth.signup) {
  //   return <Header title={RouteTitle.auth.signup} />;
  // }
  // 회원가입 완료
  else if (pathname === RoutePaths.auth.sign_complete) {
    return <Header title={RouteTitle.auth.sign_complete} />;
  }
  //아이디/비밀번호 찾기
  else if (pathname === RoutePaths.auth.find.index) {
    return <Header title={RouteTitle.auth.find.index} />;
  }
  //아이디 찾기
  else if (pathname === RoutePaths.auth.find.email) {
    return <Header title={RouteTitle.auth.find.email} />;
  }
  //비밀번호 찾기
  else if (pathname === RoutePaths.auth.find.password) {
    return <Header title={RouteTitle.auth.find.password} />;
  }
  //이메일 찾기 완료
  else if (pathname === RoutePaths.auth.find.email_complete) {
    return <Header title={RouteTitle.auth.find.email_complete} />;
  }
  //비밀번호 재설정
  else if (pathname === RoutePaths.auth.find.password_complete) {
    return <Header title={RouteTitle.auth.find.password_complete} />;
  }

  // 내가 등록한 매물
  else if (pathname === RoutePaths.main.realty.enrollment) {
    return <Header title={RouteTitle.main.realty.enrollment} />;
  }
  // 내가 문의한 매물
  else if (pathname === RoutePaths.main.realty.contact) {
    return <Header title={RouteTitle.main.realty.contact} />;
  }
    // 내가 찜한 매물
    else if (pathname === RoutePaths.main.realty.like) {
      return <Header title={RouteTitle.main.realty.like} />;
    }
  // 매물 등록
  else if (pathname === RoutePaths.main.realty.write) {
    return <Header title={RouteTitle.main.realty.write} />;
  }
  // 매물 수정
  else if (pathname === RoutePaths.main.realty.modify) {
    return <Header title={RouteTitle.main.realty.modify} />;
  }
  //이벤트 리스트
  else if (pathname === RoutePaths.main.event.index) {
    return <Header title={RouteTitle.main.event.index} />;
  }
  //이벤트 상세보기
  else if (pathname.indexOf(RoutePaths.main.event.detail)!==-1) {
    return <Header title={RouteTitle.main.event.detail} />;
  }
  //내 정보 수정
  else if (pathname === RoutePaths.main.mypage.index) {
    return <Header title={RouteTitle.main.mypage.index} />;
  }
  //이름 변경
  else if (pathname === RoutePaths.main.mypage.update.name) {
    return <Header title={RouteTitle.main.mypage.update.name} />;
  }
  //비밀번호 변경
  else if (pathname === RoutePaths.main.mypage.update.password) {
    return <Header title={RouteTitle.main.mypage.update.password} />;
  }
  //연락처 변경
  else if (pathname === RoutePaths.main.mypage.update.phone_number) {
    return <Header title={RouteTitle.main.mypage.update.phone_number} />;
  } else {
    return null;
  }
};

export default RenderHeader;
