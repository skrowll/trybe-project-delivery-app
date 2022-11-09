import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { request } from '../services/requests';

function Details() {
  const { id } = useParams();
  const [saleDetails, setSaleDetails] = useState();

  useEffect(() => {
    const requestData = async () => {
      const data = await request('get', `/seller/orders/${id}`);
      setSaleDetails(data);
    };
    requestData();
  }, [id]);

  const convertDate = (prevDate) => prevDate.split('T')[0].split('-').reverse().join('/');

  const dataTestIds = {
    orderId: 'seller_order_details__element-order-details-label-order-id',
    deliveryStatus: 'seller_order_details__element-order-details-label-delivery-status',
    orderDate: 'seller_order_details__element-order-details-label-order-date',
    preparingCheck: 'seller_order_details__button-preparing-check',
    dispatchCheck: 'seller_order_details__button-dispatch-check',
    itemNumber: 'seller_order_details__element-order-table-item-number-',
    tableName: 'seller_order_details__element-order-table-name-',
    tableQuantity: 'seller_order_details__element-order-table-quantity-',
    unitPrice: 'seller_order_details__element-order-table-unit-price-',
    subTotal: 'seller_order_details__element-order-table-sub-total-',
    totalPrice: 'seller_order_details__element-order-total-price',
  };

  return (
    <section>
      <h1>Detalhe do Pedido</h1>
      <div>
        {saleDetails
          && (
            <table>
              <thead>
                <tr>
                  <th
                    data-testid={ dataTestIds.orderId }
                  >
                    { `Pedido ${saleDetails.id}` }
                  </th>
                  <th
                    data-testid={ dataTestIds.orderDate }
                  >
                    { convertDate(saleDetails.saleDate) }
                  </th>
                  <th
                    data-testid={ dataTestIds.deliveryStatus }
                  >
                    { saleDetails.status }
                  </th>
                  <th>
                    <button
                      type="button"
                      data-testid={ dataTestIds.preparingCheck }
                    >
                      PREPARAR PEDIDO
                    </button>
                  </th>
                  <th>
                    <button
                      type="button"
                      data-testid={ dataTestIds.dispatchCheck }
                    >
                      SAIU PARA ENTREGA
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Item</td>
                  <td>Descrição</td>
                  <td>Quantidade</td>
                  <td>Valor Unitário</td>
                  <td>Sub-total</td>
                </tr>
                {saleDetails.products.map((product, index) => (
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
          )}
        {saleDetails
          && (
            <div>
              <span
                data-testid={ dataTestIds.totalPrice }
              >
                { `R$ ${saleDetails.totalPrice}` }
              </span>
            </div>
          )}
      </div>
    </section>
  );
}

export default Details;
