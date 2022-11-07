import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { setToken, request } from '../services/requests';

function Orders() {
  const [sellerSales, setSellerSales] = useState([]);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
    const requestData = async () => {
      const data = await request('get', '/seller/orders');
      setSellerSales(data);
    };
    requestData();
  }, []);

  useEffect(() => {
    console.log('SALES', sellerSales);
  }, [sellerSales]);

  return (
    <section className="sales-cards">
      {sellerSales.map((sale) => {
        const {
          id,
          status,
          totalPrice,
          saleDate,
          deliveryAddress,
          deliveryNumber,
        } = sale;

        return (
          <a
            key={ uuidv4() }
            href={ `http://localhost:3000/seller/orders/${id}` }
          >
            <div>
              <span
                data-testid={ `seller_orders__element-order-id-${id}` }
              >
                { `Pedido ${id}` }
              </span>
              <span
                data-testid={ `seller_orders__element-delivery-status-${id}` }
              >
                { status }
              </span>
              <span
                data-testid={ `seller_orders__element-card-price-${id}` }
              >
                { totalPrice }
              </span>
              <span
                data-testid={ `seller_orders__element-order-date-${id}` }
              >
                { saleDate }
              </span>
              <span
                data-testid={ `seller_orders__element-card-address-${id}` }
              >
                { `${deliveryAddress}, ${deliveryNumber}` }
              </span>
            </div>
          </a>
        );
      })}
    </section>
  );
}

export default Orders;
