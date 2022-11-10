import propTypes from 'prop-types';

const header = [
  'Item',
  'Descrição',
  'Quantidade',
  'Valor Unitário',
  'Sub-total',
  'Remover Item',
];

function CardOrders({ cart, cartTotalPrice, createListTable }) {
  return (
    <div>
      <fieldset>
        <table>
          <thead>
            <tr>
              {header.map((name) => (
                <th key={ name }>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cart.map((product, index) => (
              <tr key={ index }>
                {createListTable(product, index)}
              </tr>
            ))}
          </tbody>
        </table>
        <span data-testid="customer_checkout__element-order-total-price">
          {/* {`Total: R$${(cartTotalPrice).toFixed(2)}`} */}
          { (cartTotalPrice).toFixed(2).replace('.', ',') }
        </span>
      </fieldset>
    </div>
  );
}

CardOrders.propTypes = {
  cart: propTypes.arrayOf().isRequired,
  createListTable: propTypes.func.isRequired,
  cartTotalPrice: propTypes.number.isRequired,
};

export default CardOrders;
