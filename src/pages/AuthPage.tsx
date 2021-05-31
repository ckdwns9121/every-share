


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

import { Paths } from "../core/utils/path";


function AuthPage(){

    return(
        <Switch>
          <Route path={Paths.auth.index} 
            render={() =>(
                <Switch>
                    <Route path ={Paths.auth.login} component={LoginPage}/>
                    <Route path ={Paths.auth.signin} component={SigninPage}/>
                    <Route path ={Paths.auth.signup} component={SignupPage}/>
                    <Route path ={Paths.auth.sign_complete} component={SignupCompletePage}/>
                    <Route path ={Paths.auth.find.index} component={FindPage}/>
                    <Route exact path ={Paths.auth.index} render ={()=> <Redirect to={Paths.auth.login}/>}/>
                    <Route component ={ErrorPage}/>
                </Switch>
            )}
          />
        </Switch>
    )
}
export default AuthPage;