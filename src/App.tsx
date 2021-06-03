import {
  Route,
  BrowserRouter as Router,
  Switch,
  useLocation,
} from "react-router-dom";

import RenderHeader from './components/header/RenderHeader';
import "./App.scss";

//page
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import ErrorPage from './pages/ErrorPage';

//hooks
import { useEffect } from "react";
import { useToken } from "./hooks/useStore";

//util
import { RoutePaths } from "./core/utils/path";
import {requestGetUser} from './api/auth';


function App() {

  const access_token = useToken();
  const callApiUserInfo = async()=>{
    try{
      if(access_token){
        const res = await requestGetUser(access_token);
        console.log(res);
      }
    }
    catch(e){

    }
  }

  useEffect(()=>{
    callApiUserInfo();
  },[])

  return (
    <div className="App">
      <Router>
        <RenderHeader/>
        <Switch>
          <Route path={RoutePaths.auth.index} component={AuthPage} />
          <Route path={RoutePaths.index} component={MainPage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
