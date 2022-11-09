import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import DeliveryContext from '../context/DeliveryContext';
import { request, setToken } from '../services/requests';

function Orders() {
  const { values: { orders }, functions: { setOrders } } = useContext(DeliveryContext);

  useEffect(() => {
    const fetchOrders = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      setToken(token);
      const orderList = await request('get', 'customer/orders');
      setOrders(orderList);
    };
    fetchOrders();
  }, [setOrders]);

  return (
    <main>
      <Navbar />
      <section style={ { display: 'flex', gap: '10px', justifyContent: 'flex-start' } }>
        {
          orders.map((order) => (
            <Link to={ `/customer/orders/${order.id}` } key={ order.id }>
              <OrderCard order={ order } />
            </Link>
          ))
        }
      </section>
    </main>
  );
}

export default Orders;
