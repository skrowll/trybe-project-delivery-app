import { useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import DeliveryContext from '../context/DeliveryContext';
import { request } from '../services/requests';

const orders = [
  { id: 1, totalPrice: 20, saleDate: '08/04/21', status: 'Pendente' },
  { id: 2, totalPrice: 40, saleDate: '07/04/21', status: 'Preparando' },
];

function Orders() {
  const { setOrders } = useContext(DeliveryContext);

  useEffect(() => {
    const fetchOrders = async () => {
      const orderList = await request('get', 'customer/orders');
      setOrders(orderList);
    };
    fetchOrders();
  }, [setOrders]);

  return (
    <main>
      <Navbar />
      <section>
        {
          orders.map((order) => (
            <div
              key={ order.id }
            >
              <OrderCard order={ order } />
            </div>
          ))
        }
      </section>
    </main>
  );
}

export default Orders;
