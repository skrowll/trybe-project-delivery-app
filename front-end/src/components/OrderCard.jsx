import PropTypes from 'prop-types';

function OrderCard({ order }) {
  const { id, totalPrice, saleDate, status } = order;

  return (
    <>
      <p data-testid={ `customer_orders__element-order-id-${id}` }>{ `Pedido ${id}` }</p>
      <p data-testid={ `customer_orders__element-delivery-status-${id}` }>{ status }</p>
      <p data-testid={ `customer_orders__element-order-date-${id}` }>{ saleDate }</p>
      <p data-testid={ `customer_orders__element-card-price-${id}` }>
        { `R$ ${totalPrice}` }
      </p>
    </>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    totalPrice: PropTypes.number,
    saleDate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default OrderCard;
