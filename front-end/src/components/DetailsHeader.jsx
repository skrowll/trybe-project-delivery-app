import PropTypes from 'prop-types';

const dataTestIds = {
  orderId: 'seller_order_details__element-order-details-label-order-id',
  deliveryStatus: 'seller_order_details__element-order-details-label-delivery-status',
  orderDate: 'seller_order_details__element-order-details-label-order-date',
  preparingCheck: 'seller_order_details__button-preparing-check',
  dispatchCheck: 'seller_order_details__button-dispatch-check',
};

function DetailsHeader({ order, role }) {
  const { id, saleDate, status } = order;

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
      { role === 'customer' && <span>nome do vendedor</span>}
      <span data-testid={ dataTestIds.orderDate }>{ date }</span>
      <span data-testid={ dataTestIds.deliveryStatus }>{ status }</span>
      <span>
        <button
          type="button"
          data-testid={ dataTestIds.preparingCheck }
        >
          PREPARAR PEDIDO
        </button>
      </span>
      <span>
        <button
          type="button"
          data-testid={ dataTestIds.dispatchCheck }
        >
          SAIU PARA ENTREGA
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
  }).isRequired,
  role: PropTypes.string.isRequired,
};

export default DetailsHeader;
