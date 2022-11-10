import PropTypes from 'prop-types';
import dataTestIds from '../utils/dataTestIds';

function DetailsHeader({ order, role }) {
  const { id, saleDate, status, seller } = order;

  const date = new Date(saleDate).toLocaleDateString();

  return (
    <header
      style={
        { display: 'flex',
          borderBottom: '2px solid lightgray',
          justifyContent: 'space-between',
          width: '90%',
          padding: '10px',
          margin: '0 auto 10px' }
      }
    >
      <span data-testid={ dataTestIds.orderId }>{ `Pedido ${id}` }</span>
      { role === 'customer' && <span>{seller?.name}</span> }
      <span data-testid={ dataTestIds.orderDate }>{ date }</span>
      <span data-testid={ dataTestIds.deliveryStatus }>{ status }</span>
      <span>
        <button
          type="button"
          data-testid={ dataTestIds.preparingCheck }
        >
          {role === 'customer' ? 'ENTREGUE' : 'PREPARAR PEDIDO'}
        </button>
      </span>
      <span>
        <button
          type="button"
          data-testid={ dataTestIds.dispatchCheck }
        >
          {role === 'customer' ? 'MARCAR COMO ENTREGUE' : 'SAIU PARA ENTREGA'}
        </button>
      </span>
    </header>
  );
}

DetailsHeader.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    saleDate: PropTypes.string,
    status: PropTypes.string,
    seller: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  role: PropTypes.string.isRequired,
};

export default DetailsHeader;
