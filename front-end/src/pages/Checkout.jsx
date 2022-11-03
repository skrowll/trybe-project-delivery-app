import { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';

import DeliveryContext from '../context/DeliveryContext';
import Navbar from '../components/Navbar';

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

  const removeItem = (id, list) => list.filter(({ id: idFilter }) => idFilter !== id);

  const createListTable = (({ id, name, quantity, price }) => (
    <>
      <td>{ id }</td>
      <td>{ name }</td>
      <td>{ quantity }</td>
      <td>{ `R$${price}` }</td>
      <td>{ quantity * price }</td>
      <td>
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
      <div>
        <h1>Finalizar Pedido</h1>
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
                <tr
                  key={ index }
                  data-testid={ `element-order-table-name-${index}` }
                >
                  { createListTable(product) }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Checkout;
