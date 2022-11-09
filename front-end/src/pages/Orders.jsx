import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import DeliveryContext from '../context/DeliveryContext';
import { request } from '../services/requests';

function Orders() {
  const { values: { orders }, functions: { setOrders } } = useContext(DeliveryContext);

  useEffect(() => {
    const fetchOrders = async () => {
      const orderList = await request('get', 'customer/orders');
      setOrders(orderList);
    };
    fetchOrders();
  }, [setOrders]);

  console.log(orders);

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
