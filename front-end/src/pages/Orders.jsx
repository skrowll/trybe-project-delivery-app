import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import DeliveryContext from '../context/DeliveryContext';
import { setToken, request } from '../services/requests';

function Orders() {
  const { values: { orders }, functions: { setOrders } } = useContext(DeliveryContext);
  const { token, role } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setToken(token);
    const url = role === 'customer' ? '/customer/orders' : '/seller/orders';
    const requestData = async () => {
      const data = await request('get', url);
      setOrders(data);
    };
    requestData();
  }, [setOrders, token, role]);

  return (
    <main>
      <Navbar />
      <section style={ { display: 'flex', gap: '10px', justifyContent: 'flex-start' } }>
        {
          orders.map((order) => (
            <Link
              to={
                role === 'customer'
                  ? `/customer/orders/${order.id}`
                  : `/seller/orders/${order.id}`
              }
              key={ order.id }
            >
              <OrderCard order={ order } role={ role } />
            </Link>
          ))
        }
      </section>
    </main>
  );
}

export default Orders;
