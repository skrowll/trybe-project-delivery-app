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
  const { products } = useContext(DeliveryContext);

  const createListTable = (({ id, name, quantity, price }) => (
    <tr>
      <td>{ id }</td>
      <td>{ name }</td>
      <td>{ quantity }</td>
      <td>{ `R$${price}` }</td>
      <td>{ quantity * price }</td>
      <td>{ () => '' }</td>
    </tr>
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
              products.map((product) => createListTable(product))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Checkout;
