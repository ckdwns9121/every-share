import React from "react";

import FindContainer from "../../../containers/auth/find/FindContainer";
import FindEmailContainer from "../../../containers/auth/find/FindEmailContainer";
import FindPasswordContainer from "../../../containers/auth/find/FindPasswordContainer";

import { Route, Switch } from "react-router-dom";

import { RoutePaths } from "../../../core/utils/path";

function FindPage() {
  return (
      <Route path={RoutePaths.auth.find.index}
        render={() => (
          <Switch>
            <Route path={RoutePaths.auth.find.index} component={FindContainer} exact />
            <Route path={RoutePaths.auth.find.email} component={FindEmailContainer}/>
            <Route path={RoutePaths.auth.find.password}component={FindPasswordContainer}/>
          </Switch>
        )}
      />
  );
}

export default FindPage;
