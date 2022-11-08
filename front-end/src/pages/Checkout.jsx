import { useContext } from 'react';
import DeliveryContext from '../context/DeliveryContext';

import Navbar from '../components/Navbar';
import CardAdressDetails from '../components/CardAdressDetails';
import CardOrders from '../components/CardOrders';

function Checkout() {
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
        { price.replace('.', ',') }
      </td>
      <td data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }>
        {/* { `R$${(price * quantity).toFixed(2)}` } */}
        { (price * quantity).toFixed(2).replace('.', ',') }
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
    <div>
      <Navbar />
      <h1>Finalizar Pedido</h1>
      <CardOrders
        cart={ cart }
        cartTotalPrice={ cartTotalPrice }
        createListTable={ createListTable }
      />
      <CardAdressDetails
        cart={ cart }
        cartTotalPrice={ cartTotalPrice }
      />
    </div>
  );
}
export default Checkout;

// TODO: remover por quantidade, um de cada vez
// TODO: pegar compras do carrinho local
// id do seller - CardAdressDetails
// 201 - Created com retorno de id da compra
