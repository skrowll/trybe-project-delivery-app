import PropTypes from 'prop-types';
import { request, setToken } from '../services/requests';
import dataTestIds from '../utils/dataTestIds';

function DetailsHeader({ order, role }) {
  const { id, saleDate, status, seller } = order;

  const date = new Date(saleDate).toLocaleDateString();

  const updateStatus = async (newStatus) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
    await request('patch', `/seller/orders/${id}`, { status: newStatus });
    // window.location.reload(true);
  };

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
      <span data-testid={ `${role}${dataTestIds.orderId}` }>{ `Pedido ${id}` }</span>
      { role === 'customer'
        && (
          <span
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {seller?.name}
          </span>
        )}
      <span data-testid={ `${role}${dataTestIds.orderDate}` }>{ date }</span>
      <span data-testid={ `${role}${dataTestIds.deliveryStatus}` }>{ status }</span>
      {
        role === 'customer'
          ? (
            <span>
              <button
                type="button"
                data-testid="customer_order_details__button-delivery-check"
                disabled={ status !== 'Em Trânsito' }
                onClick={ () => updateStatus('Entregue') }
              >
                MARCAR COMO ENTREGUE
              </button>
            </span>
          )
          : (
            <div>
              <span>
                <button
                  type="button"
                  data-testid={ `${role}${dataTestIds.preparingCheck}` }
                  disabled={ status !== 'Pendente' }
                  onClick={ () => updateStatus('Preparando') }
                >
                  PREPARAR PEDIDO
                </button>
              </span>
              <span>
                <button
                  type="button"
                  data-testid={ `${role}${dataTestIds.dispatchCheck}` }
                  disabled={ status !== 'Preparando' }
                  onClick={ () => updateStatus('Em Trânsito') }
                >
                  SAIU PARA ENTREGA
                </button>
              </span>
            </div>
          )
      }
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
