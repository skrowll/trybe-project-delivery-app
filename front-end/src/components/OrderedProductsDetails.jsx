import PropTypes from 'prop-types';
import dataTestIds from '../utils/dataTestIds';

function OrderedProductsDetails({ product }) {
  const { id, name, salesProducts: { quantity }, price } = product;
  const { role } = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <td data-testid={ `${role}${dataTestIds.itemNumber}${id}` }>{ id }</td>
      <td data-testid={ `${role}${dataTestIds.tableName}${id}` }>{ name }</td>
      <td data-testid={ `${role}${dataTestIds.tableQuantity}${id}` }>{ quantity }</td>
      <td data-testid={ `${role}${dataTestIds.unitPrice}${id}` }>
        { Number(price).toFixed(2).replace('.', ',') }
      </td>
      <td data-testid={ `${role}${dataTestIds.subTotal}${id}` }>
        { Number(quantity * price).toFixed(2).replace('.', ',') }
      </td>
    </>
  );
}

OrderedProductsDetails.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    salesProducts: PropTypes.shape({
      quantity: PropTypes.number,
    }),
    price: PropTypes.string,
  }).isRequired,
};

export default OrderedProductsDetails;
