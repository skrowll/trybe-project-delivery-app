import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCartTotalPrice(cart
      .reduce((acc, { quantity, price }) => (
        acc + quantity * +price
      ), 0));

    localStorage.setItem('carrinho', JSON.stringify(cart));
  }, [cart]);

  const providerContext = useMemo(() => ({
    values: { cart, cartTotalPrice },
    functions: { setCart },
  }), [cart, cartTotalPrice]);

  return (
    <DeliveryContext.Provider value={ providerContext }>
      {children}
    </DeliveryContext.Provider>
  );
}

DeliveryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DeliveryProvider;
