import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [checkoutProductStatus, setCheckoutProductStatus] = useState({
    checkoutDisabled: true,
    amountOfItemsOnCart: 0,
    totalPrice: 0,
  });

  const providerContext = useMemo(() => ({
    products,
    setProducts,
    checkoutProductStatus,
    setCheckoutProductStatus,
  }), [products, checkoutProductStatus]);

  return (
    <DeliveryContext.Provider
      value={ providerContext }
    >
      {children}
    </DeliveryContext.Provider>
  );
}

DeliveryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DeliveryProvider;
