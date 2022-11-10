import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailsHeader from '../components/DetailsHeader';
import OrderedProductsDetails from '../components/OrderedProductsDetails';
import { request, setToken } from '../services/requests';

const dataTestIds = {
  totalPrice: 'seller_order_details__element-order-total-price',
};

const tableHeaderCols = [
  'Item',
  'Descrição',
  'Quantidade',
  'Valor Unitário',
  'Sub-total',
];

function Details() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const { products } = order;
  const { token, role } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setToken(token);
    const url = role === 'customer' ? '/customer/orders' : '/seller/orders';
    const requestData = async () => {
      const data = await request('get', `${url}/${id}`);
      setOrder(data);
    };
    requestData();
  }, [id, token, role, setOrder]);

  return (
    <section>
      <h1>Detalhe do Pedido</h1>
      <div>
        <DetailsHeader order={ order } role={ role } />
        <table style={ { width: '90%', margin: '0 auto', textAlign: 'center' } }>
          <thead>
            <tr>
              { tableHeaderCols.map((col) => (<th key={ col }>{col}</th>)) }
            </tr>
          </thead>
          <tbody>
            { products?.map((product) => (
              <tr key={ product.id }>
                <OrderedProductsDetails product={ product } />
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <span
            data-testid={ dataTestIds.totalPrice }
          >
            { `R$ ${Number(order.totalPrice).toFixed(2).replace('.', ',')}` }
          </span>
        </div>
      </div>
    </section>
  );
}

export default Details;
