import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../features/auth/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  const handleLogin = (userToken) => {
    dispatch(login({ token: userToken }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    isAuthenticated,
    token,
    login: handleLogin,
    logout: handleLogout,
  };
};

export default useAuth;
