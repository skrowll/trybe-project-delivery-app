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
          <Link
            to="/customer/products"
            data_testid="customer_products__element-navbar-link-products"
          >
            <li>PRODUTOS</li>
          </Link>
          <Link
            to="/customer/orders"
            data_testid="customer_products__element-navbar-link-orders"
          >
            <li>MEUS PEDIDOS</li>
          </Link>
        </ul>
      </div>
      <div>
        <span
          data_testid="customer_products__element-navbar-user-full-name"
        >
          {username}
        </span>
        <button
          type="button"
          onClick={ loggoutUser }
          data_testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
