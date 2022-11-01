import { useEffect, useContext } from 'react';
import DeliveryContext from '../context/DeliveryContext';

function Navbar() {
  const { user, setUser, decodeJWTGetUser } = useContext(DeliveryContext);

  useEffect(() => {
    const userProfile = decodeJWTGetUser();
    setUser(userProfile.data.user);
  }, [decodeJWTGetUser, setUser]);

  return (
    <nav className="navbar">
      <div className="delivery-menu-options">
        <ul>
          <li>PRODUTOS</li>
          <li>MEUS PEDIDOS</li>
        </ul>
      </div>
      <div>
        <ul className="delivery-user-options">
          <li>{user.name}</li>
          <li>Sair</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
