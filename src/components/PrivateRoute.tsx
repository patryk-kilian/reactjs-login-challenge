import { useAuth } from '../context/auth-context';
import { LOGIN } from '../constants/routes';
import { Redirect, Route, RouteProps } from 'react-router';

export default function PrivateRoute({ ...routeProps }: RouteProps) {
  const { token } = useAuth()!;

  if (token) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={LOGIN} />;
  }
}
