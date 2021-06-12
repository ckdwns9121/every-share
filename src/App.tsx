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

//store
import {useDispatch} from 'react-redux';
import {set_user} from './store/user';
import {getList} from './store/realties';

function App() {

  const access_token = useToken();
  const dispatch = useDispatch();

  
  const callApiUserInfo = async()=>{
    try{
      if(access_token){
        const res = await requestGetUser(access_token);
        if(res?.data.message==='success'){
          dispatch(set_user(res.data.user));
        }
      }
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    callApiUserInfo();
    dispatch(getList({lat:0,lng:0,filter:[1,2,3,4]}));
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
