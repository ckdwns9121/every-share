import React from "react";

import FindContainer from "../../../containers/auth/find/FindContainer";
import FindEmailContainer from "../../../containers/auth/find/FindEmailContainer";
import FindPasswordContainer from "../../../containers/auth/find/FindPasswordContainer";

import { Route, Switch } from "react-router-dom";

import { Paths } from "../../../core/utils/path";

function FindPage() {
  return (
      <Route path={Paths.auth.find.index}
        render={() => (
          <Switch>
            <Route path={Paths.auth.find.index} component={FindContainer} exact />
            <Route path={Paths.auth.find.email} component={FindEmailContainer}/>
            <Route path={Paths.auth.find.password}component={FindPasswordContainer}/>
          </Switch>
        )}
      />
  );
}

export default FindPage;
