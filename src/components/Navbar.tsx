import { Button, Navbar as Nav } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { useUser } from '../context/user-context';
import { LOGIN } from '../constants/routes';
import './Navbar.css';

const Navbar = () => {
  const { logout, isLoading } = useAuth()!;
  const { user } = useUser()!;
  const history = useHistory();

  const handleLogout = () => {
    logout();

    history.push(LOGIN);
  };

  return (
    <Nav color='primary'>
      <div className='navbar-wrap'>
        <div className='navbar-right'>
          {!isLoading && (
            <p>
              Welcome!&nbsp;{user?.firstName}&nbsp;{user?.lastName}
            </p>
          )}
          <Button color='secondary' size='sm' onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
