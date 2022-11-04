import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [isCheckoutButtonDisabled, setIsCheckoutButtonDisabled] = useState(true);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [globalCart, setGlobalCart] = useState({
    products: [],
    totalPrice: 0,
  });

  const providerContext = useMemo(() => ({
    globalCart,
    isCheckoutButtonDisabled,
    cartTotalPrice,
    setIsCheckoutButtonDisabled,
    setCartTotalPrice,
    setGlobalCart,
  }), [isCheckoutButtonDisabled, cartTotalPrice, globalCart]);

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
