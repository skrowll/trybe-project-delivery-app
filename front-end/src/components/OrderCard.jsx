import PropTypes from 'prop-types';

function OrderCard({ order, role }) {
  const { id, totalPrice, saleDate, status, deliveryAddress, deliveryNumber } = order;

  const date = new Date(saleDate).toLocaleDateString();

  return (
    <div
      style={
        { alignItems: 'center',
          border: 'solid 1px black',
          display: 'flex',
          gap: '20px',
          justifyContent: 'space-between',
          marginBottom: '10px',
          padding: '0 10px',
          width: '300px' }
      }
    >
      <p data-testid={ `customer_orders__element-order-id-${id}` }>{ `Pedido ${id}` }</p>
      <p data-testid={ `customer_orders__element-delivery-status-${id}` }>{ status }</p>
      <div>
        <p data-testid={ `customer_orders__element-order-date-${id}` }>{ date }</p>
        <p data-testid={ `customer_orders__element-card-price-${id}` }>
          { `R$ ${Number(totalPrice)}` }
        </p>
      </div>
      { role === 'seller'
        && (
          <div
            data-testid={ `seller_orders__element-card-address-${id}` }
          >
            { `${deliveryAddress}, ${deliveryNumber}` }
          </div>
        )}
    </div>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    totalPrice: PropTypes.string,
    saleDate: PropTypes.string,
    status: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
  }).isRequired,
  role: PropTypes.string.isRequired,
};

export default OrderCard;
