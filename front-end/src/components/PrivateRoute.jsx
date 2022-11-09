import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function PrivateRoute() {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('user'))?.token || null;

  useEffect(() => {
    if (!token) navigate('/login', { replace: true });
  }, [token, navigate]);

  return token && <Outlet />;
}

export default PrivateRoute;
