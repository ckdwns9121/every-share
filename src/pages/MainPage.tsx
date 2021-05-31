
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
import { Paths } from "../core/utils/path";

function MainPage() {
  return (
    <Switch>
      <Route path={Paths.index}
        render={() => (
          <Switch>
            <Route path={`${Paths.main.index}/:modal?`} component={Map} />
            <Route path={`${Paths.main.detail}/:id`} component={Detail} />
            <Route path={Paths.main.event.index} component={EventList} />
            <Route path={`${Paths.main.event.detail}/:id`} component={Event} />
            <Route path={Paths.main.realty.index}
                render={()=>
                <Switch> 
                    <Route path = {Paths.main.realty.contact} component={RealtyContact}/>
                    <Route path = {`${Paths.main.realty.write}/:modal?`} component={RealtyWrite}/>
                    <Route path = {`${Paths.main.realty.modify}/:id`} component={RealtyModify}/>
                    <Route path = {Paths.main.realty.enrollment} component={RealtyEnrollment}/>
                    <Route exact path={Paths.main.realty.index} render = {()=> <Redirect to={Paths.main.realty.contact}/>}/>
                    <Route component={ErrorPage}/>
                </Switch>
                }
            />
            <Route path={Paths.main.mypage.index} exact component={Mypage} />
            <Route path={Paths.main.like} exact component={Like} />
            <Route path={Paths.main.mypage.update.index}
                render ={()=> 
                <Switch> 
                    <Route path = {Paths.main.mypage.update.name} component={UpdateName}/>
                    <Route path = {Paths.main.mypage.update.password} component={UpdatePassword}/>
                    <Route path = {Paths.main.mypage.update.phone_number} component={UpdatePhone}/>
                    <Route exact path={Paths.main.mypage.update.index} render = {()=> <Redirect to={Paths.main.mypage.update.name}/>}/>
                    <Route component={ErrorPage}/>
                </Switch>
                }
            />
            <Route exact path={Paths.index} render = {()=> <Redirect to={Paths.main.index}/>} />
            <Route component = {ErrorPage} />
          </Switch>
        )}
      />
    </Switch>
  );
}

export default MainPage;
