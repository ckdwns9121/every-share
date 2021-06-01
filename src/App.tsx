import {
  Route,
  BrowserRouter as Router,
  Switch,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

import { RoutePaths } from "./core/utils/path";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import ErrorPage from './pages/ErrorPage';

import RenderHeader from './components/header/RenderHeader';
import "./App.scss";

function App() {



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
