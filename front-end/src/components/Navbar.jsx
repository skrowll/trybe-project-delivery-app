import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JWTDecode from 'jwt-decode';

function Navbar() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    const userEntity = JWTDecode(userToken);
    localStorage.setItem('name', userEntity.data.user.name);
    localStorage.setItem('email', userEntity.data.user.email);

    setUsername(userEntity.data.user.name);
  }, []);

  const loggoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="delivery-menu-options">
        <ul>
          <Link to="/customer/products"><li>PRODUTOS</li></Link>
          <Link to="/customer/orders"><li>MEUS PEDIDOS</li></Link>
        </ul>
      </div>
      <div>
        <ul className="delivery-user-options">
          <li>{username}</li>
          <button type="button" onClick={ loggoutUser }>
            Sair
          </button>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
