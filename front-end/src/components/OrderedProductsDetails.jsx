import PropTypes from 'prop-types';
import dataTestIds from '../utils/dataTestIds';

function OrderedProductsDetails({ product }) {
  const { id, name, salesProducts: { quantity }, price } = product;

  return (
    <>
      <td data-testid={ `${dataTestIds.itemNumber}${id}` }>{ id }</td>
      <td data-testid={ `${dataTestIds.tableName}${id}` }>{ name }</td>
      <td data-testid={ `${dataTestIds.tableQuantity}${id}` }>{ quantity }</td>
      <td data-testid={ `${dataTestIds.unitPrice}${id}` }>
        { Number(price).toFixed(2).replace('.', ',') }
      </td>
      <td data-testid={ `${dataTestIds.subTotal}${id}` }>
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
