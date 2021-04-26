import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { AuthProvider } from './context/auth-context';
import { UserProvider } from './context/user-context';
import PrivateRoute from './components/PrivateRoute';

import Login from './pages/login';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <Router>
            <Switch>
              <PrivateRoute exact path={'/'} component={Dashboard} />
              <Route path={ROUTES.LOGIN} component={Login} />
              <PrivateRoute path={ROUTES.DASHBOARD} component={Dashboard} />
            </Switch>
          </Router>
        </UserProvider>
      </AuthProvider>
    </>
  );
}

export default App;
