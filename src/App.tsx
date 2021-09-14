import {
  Route,
  BrowserRouter as Router,
  Switch,
  useLocation,
} from "react-router-dom";

import RenderHeader from './components/header/RenderHeader';
import Loading from './components/asset/Loading';
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
import { set_filters } from "./store/filter";

//asset
import SnackBar from "./components/asset/Snackbar";
import SnackbarPortal from "./SnackbarPortal";

import {isCheck} from './types/User';
//type
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
  },[])

  useEffect(()=>{
    let storageFilter : string| null| any  = localStorage.getItem('filter');
    if(storageFilter){
      storageFilter = JSON.parse(storageFilter);
      dispatch(set_filters({type:'oneroom',value:storageFilter.oneroom}))
      dispatch(set_filters({type:'tworoom',value:storageFilter.tworoom}))
      dispatch(set_filters({type:'op',value:storageFilter.op}))
      dispatch(set_filters({type:'duplex',value:storageFilter.duplex}))
    }
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
      <Loading/>
      <SnackbarPortal>
      <SnackBar/>
      </SnackbarPortal>
    </div>
  );
}

export default App;
