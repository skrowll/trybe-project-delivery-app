import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import OrderDetailsHeader from '../components/OrderDetailsHeader';
import DeliveryContext from '../context/DeliveryContext';
import { request, setToken } from '../services/requests';

const dataTestIds = {
  itemNumber: 'seller_order_details__element-order-table-item-number-',
  tableName: 'seller_order_details__element-order-table-name-',
  tableQuantity: 'seller_order_details__element-order-table-quantity-',
  unitPrice: 'seller_order_details__element-order-table-unit-price-',
  subTotal: 'seller_order_details__element-order-table-sub-total-',
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
  const { values: { orders }, functions: { setOrders } } = useContext(DeliveryContext);
  const { token, role } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setToken(token);
    const url = role === 'customer' ? '/customer/orders' : '/seller/orders';
    const requestData = async () => {
      const data = await request('get', `${url}/${id}`);
      console.log(data);
      setOrders(data);
    };
    requestData();
  }, [id, token, role, setOrders]);

  return (
    <section>
      <h1>Detalhe do Pedido</h1>
      <div>
        <OrderDetailsHeader order={ orders } role={ role } />
        <table>
          <thead>
            <tr>
              { tableHeaderCols.map((col) => (<th key={ col }>{col}</th>))}
            </tr>
          </thead>
          <tbody>
            {orders.products?.map((product, index) => (
              <tr
                key={ uuidv4() }
              >
                <td
                  data-testid={ `${dataTestIds.itemNumber}${index}` }
                >
                  {product.id}
                </td>
                <td
                  data-testid={ `${dataTestIds.tableName}${index}` }
                >
                  {product.name}
                </td>
                <td
                  data-testid={ `${dataTestIds.tableQuantity}${index}` }
                >
                  {product.salesProducts.quantity}
                </td>
                <td
                  data-testid={ `${dataTestIds.itemNumber}${index}` }
                >
                  {product.price}
                </td>
                <td
                  data-testid={ `${dataTestIds.subTotal}${index}` }
                >
                  {product.salesProducts.quantity * product.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders
          && (
            <div>
              <span
                data-testid={ dataTestIds.totalPrice }
              >
                { `R$ ${orders.totalPrice}` }
              </span>
            </div>
          )}
      </div>
    </section>
  );
}

export default Details;
