import { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import DeliveryContext from '../context/DeliveryContext';
import Navbar from '../components/Navbar';
// import { request } from '../services/requests';

const header = [
  'Item',
  'Descrição',
  'Quantidade',
  'Valor Unitário',
  'Sub-total',
  'Remover Item',
];

function Checkout() {
  const { products, setProducts } = useContext(DeliveryContext);

  const [listSeller, setListSeller] = useState([]);
  const [seller, setSeller] = useState(listSeller[0]);
  const [address, setAddress] = useState('');
  const [numberAddress, setNumberAddress] = useState(0);

  useEffect(() => {
    const data = request('get', '/users?role="seller"');
    setListSeller(data);
  }, []);

  const total = products.reduce((acc, { price, quantity }) => acc + price * quantity, 0);

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
          onClick={ () => setProducts(removeItem(id, products)) }
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
              products.map((product, index) => (
                <tr key={ index }>
                  { createListTable(product, index) }
                </tr>
              ))
            }
          </tbody>
        </table>
        <span data-testid="customer_checkout__element-order-total-price">
          { `Total: R$${(total).toFixed(2)}` }
        </span>
      </fieldset>
      <h2>Detalhe e Endereço para Entrega</h2>
      <fieldset>
        <span>Vendedor(a)</span>
        <select
          data-testid="customer_checkout__select-seller"
          id="sellers"
          name="sellers"
          onChange={ ({ target: { value } }) => setSeller(value) }
        >
          {
            listSeller.map(({ name }) => (
              <option key={ name } value={ name }>
                { name }
              </option>
            ))
          }
        </select>
        <span>Endereço</span>
        <input
          data-testid="customer_checkout__input-address"
          type="text"
          value={ address }
          onChange={ ({ target: { value } }) => setAddress(value) }
        />
        <span>Número</span>
        <input
          data-testid="customer_checkout__input-address-number"
          type="number"
          value={ numberAddress }
          onChange={ ({ target: { value } }) => setNumberAddress(value) }
        />
        <input type="button" value="Finalizar Pedido" />
      </fieldset>
      <span>
        { seller }
      </span>
    </>
  );
}

export default Checkout;
