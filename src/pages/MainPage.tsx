
import {
  Map,
  Detail,
  Event,
  EventList,
  Like,
  RealtyContact,
  RealtyWrite,
  RealtyModify,
  RealtyEnrollment,
  Mypage,
  UpdateName,
  UpdatePassword,
  UpdatePhone,
} from "./main";
import ErrorPage from './ErrorPage';

import { Route, Switch,Redirect} from "react-router-dom";
import { RoutePaths } from "../core/utils/path";



function MainPage() {

  return (
    <Switch>
      <Route path={RoutePaths.index}
        render={() => (
          <Switch>
            <Route path={`${RoutePaths.main.index}/:modal?`} component={Map} />
            <Route path={`${RoutePaths.main.detail}/:id`} component={Detail} />
            <Route path={RoutePaths.main.event.index} component={EventList} />
            <Route path={`${RoutePaths.main.event.detail}/:id`} component={Event} />
            <Route path={RoutePaths.main.realty.index}
                render={()=>
                <Switch> 
                    <Route path = {RoutePaths.main.realty.contact} component={RealtyContact}/>
                    <Route path = {`${RoutePaths.main.realty.write}/:modal?`} component={RealtyWrite}/>
                    <Route path = {`${RoutePaths.main.realty.modify}/:id`} component={RealtyModify}/>
                    <Route path = {RoutePaths.main.realty.enrollment} component={RealtyEnrollment}/>
                    <Route exact path={RoutePaths.main.realty.index} render = {()=> <Redirect to={RoutePaths.main.realty.contact}/>}/>
                    <Route component={ErrorPage}/>
                </Switch>
                }
            />
            <Route path={RoutePaths.main.mypage.index} exact component={Mypage} />
            <Route path={RoutePaths.main.like} exact component={Like} />
            <Route path={RoutePaths.main.mypage.update.index}
                render ={()=> 
                <Switch> 
                    <Route path = {RoutePaths.main.mypage.update.name} component={UpdateName}/>
                    <Route path = {RoutePaths.main.mypage.update.password} component={UpdatePassword}/>
                    <Route path = {RoutePaths.main.mypage.update.phone_number} component={UpdatePhone}/>
                    <Route exact path={RoutePaths.main.mypage.update.index} render = {()=> <Redirect to={RoutePaths.main.mypage.update.name}/>}/>
                    <Route component={ErrorPage}/>
                </Switch>
                }
            />
            <Route exact path={RoutePaths.index} render = {()=> <Redirect to={RoutePaths.main.index}/>} />
            <Route component = {ErrorPage} />
          </Switch>
        )}
      />
    </Switch>
  );
}

export default MainPage;
