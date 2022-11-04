import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [checkoutProductStatus, setCheckoutProductStatus] = useState({
    checkoutDisabled: true,
    totalPrice: 0,
  });

  const providerContext = useMemo(() => ({
    checkoutProductStatus,
    setCheckoutProductStatus,
  }), [checkoutProductStatus]);

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
