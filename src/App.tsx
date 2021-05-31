import {
  Route,
  BrowserRouter as Router,
  Switch,
  useLocation,
} from "react-router-dom";
import { Paths } from "./core/utils/path";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import ErrorPage from './pages/ErrorPage';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={Paths.auth.index} component={AuthPage} />
          <Route path={Paths.index} component={MainPage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
