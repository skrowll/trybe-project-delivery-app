import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { name, role } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setUsername(name);
  }, [name]);

  const loggoutUser = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="delivery-menu-options">
        <ul>
          {role === 'customer' && (
            <Link to="/customer/products">
              <li
                data-testid="customer_products__element-navbar-link-products"
              >
                PRODUTOS
              </li>
            </Link>
          )}
          <Link to="/customer/orders">
            <li
              data-testid="customer_products__element-navbar-link-orders"
            >
              {role === 'customer' ? 'MEUS PEDIDOS' : 'PEDIDOS'}
            </li>
          </Link>
        </ul>
      </div>
      <div>
        <span
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {username}
        </span>
        <button
          type="button"
          onClick={ loggoutUser }
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
