import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userJSON = localStorage.getItem('user');
    const userProfile = JSON.parse(userJSON);
    setUsername(userProfile.name);
  }, []);

  const loggoutUser = () => {
    localStorage.removeItem('user');
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
