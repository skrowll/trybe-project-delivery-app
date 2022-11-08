import { useContext } from 'react';
import DeliveryContext from '../context/DeliveryContext';
import Navbar from '../components/Navbar';
import CardAdressDetails from '../components/CardAdressDetails';

const header = [
  'Item',
  'Descrição',
  'Quantidade',
  'Valor Unitário',
  'Sub-total',
  'Remover Item',
];

function Checkout() {
  // const { products, setProducts } = useContext(DeliveryContext);
  const {
    functions: { setCart },
    values: { cart, cartTotalPrice } } = useContext(DeliveryContext);

  const removeItem = (id, list) => list.filter(({ id: idFilter }) => idFilter !== id);
  const createListTable = (({ id, name, quantity, price }, index) => (
    <>
      <td data-testid={ `customer_checkout__element-order-table-item-number-${index}` }>
        { index + 1 }
      </td>
      <td data-testid={ `customer_checkout__element-order-table-name-${index}` }>
        { name }
      </td>
      <td data-testid={ `customer_checkout__element-order-table-quantity-${index}` }>
        { quantity }
      </td>
      <td data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }>
        { `R$${price}` }
      </td>
      <td data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }>
        { `R$${(price * quantity).toFixed(2)}` }
      </td>
      <td data-testid={ `customer_checkout__element-order-table-remove-${index}` }>
        <input
          type="button"
          value="remover"
          onClick={ () => setCart(removeItem(id, cart)) }
        />
      </td>
    </>
  ));
  return (
    <>
      <Navbar />
      <h1>Finalizar Pedido</h1>
      <fieldset>
        <table>
          <thead>
            <tr>
              {
                header.map((name) => (
                  <th key={ name }>{ name }</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              cart.map((product, index) => (
                <tr key={ index }>
                  { createListTable(product, index) }
                </tr>
              ))
            }
          </tbody>
        </table>
        <span data-testid="customer_checkout__element-order-total-price">
          { `Total: R$${(cartTotalPrice).toFixed(2)}` }
        </span>
      </fieldset>
      <CardAdressDetails />
    </>
  );
}
export default Checkout;
