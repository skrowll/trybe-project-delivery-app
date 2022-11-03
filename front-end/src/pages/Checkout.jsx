import { useContext, useEffect } from 'react';
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

  const total = products.reduce((acc, { price, quantity }) => acc + price * quantity, 0);

  useEffect(() => {
    // const total = ;
    // console.log(total);
  }, [products]);

  const removeItem = (id, list) => list.filter(({ id: idFilter }) => idFilter !== id);

  const createListTable = (({ id, name, quantity, price }, indexLine) => (
    <>
      <td>{ indexLine }</td>
      <td>{ name }</td>
      <td>{ quantity }</td>
      <td>{ `R$${price}` }</td>
      <td>{ `R$${(price * quantity).toFixed(2)}` }</td>
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
                <tr
                  key={ index }
                  data-testid={ `element-order-table-name-${index}` }
                >
                  { createListTable(product, index + 1) }
                </tr>
              ))
            }
          </tbody>
        </table>
        <span>{ `Total: R$${(total).toFixed(2)}` }</span>
      </fieldset>
      <h2>Detalhe e Endereço para Entrega</h2>
      {/* <fieldset>

      </fieldset> */}
    </>
  );
}

export default Checkout;
