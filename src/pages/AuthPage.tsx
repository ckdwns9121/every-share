


import LoginPage from './auth/LoginPage';
import SigninPage from './auth/SigninPage';
import SignupPage from './auth/SignupPage';
import SignupCompletePage from './auth/SignupCompletePage';
import FindPage from './auth/find/FindPage';
import ErrorPage from './ErrorPage';
import {
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import { RoutePaths } from "../core/utils/path";


function AuthPage(){

    return(
        <Switch>
          <Route path={RoutePaths.auth.index} 
            render={() =>(
                <Switch>
                    <Route path ={RoutePaths.auth.login} component={LoginPage}/>
                    <Route path ={RoutePaths.auth.signin} component={SigninPage}/>
                    <Route path ={RoutePaths.auth.signup} component={SignupPage}/>
                    <Route path ={RoutePaths.auth.sign_complete} component={SignupCompletePage}/>
                    <Route path ={RoutePaths.auth.find.index} component={FindPage}/>
                    <Route exact path ={RoutePaths.auth.index} render ={()=> <Redirect to={RoutePaths.auth.login}/>}/>
                    <Route component ={ErrorPage}/>
                </Switch>
            )}
          />
        </Switch>
    )
}
export default AuthPage;