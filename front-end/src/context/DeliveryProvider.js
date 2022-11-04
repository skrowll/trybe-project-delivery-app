import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [isCheckoutButtonDisabled, setIsCheckoutButtonDisabled] = useState(true);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [productList, setProductList] = useState([]);

  const providerContext = useMemo(() => ({
    productList,
    isCheckoutButtonDisabled,
    cartTotalPrice,
    setIsCheckoutButtonDisabled,
    setCartTotalPrice,
    setProductList,
  }), [isCheckoutButtonDisabled, cartTotalPrice, productList]);

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
