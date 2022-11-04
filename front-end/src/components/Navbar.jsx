import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';

function Navbar() {
  const [username, setUsername] = useState('');
  const { checkoutProductStatus } = useContext(DeliveryContext);
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
          <Link to="/customer/products">
            <li
              data-testid="customer_products__element-navbar-link-products"
            >
              PRODUTOS
            </li>
          </Link>
          <Link to="/customer/orders">
            <li
              data-testid="customer_products__element-navbar-link-orders"
            >
              MEUS PEDIDOS
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
          name="checkout_button"
          type="button"
          disabled={ checkoutProductStatus.checkoutDisabled }
          onClick={ () => navigate('/customer/checkout') }
          data-testid="customer_products__checkout-bottom-value"
        >
          <span>{checkoutProductStatus.totalPrice}</span>
        </button>
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
