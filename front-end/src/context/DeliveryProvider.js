import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  // const [isCheckoutButtonDisabled, setIsCheckoutButtonDisabled] = useState(true);
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
  //   cart,
  //   isCheckoutButtonDisabled,
  //   cartTotalPrice,
  //   setIsCheckoutButtonDisabled,
  //   setCartTotalPrice,
  //   setCart,
    values: { cart, cartTotalPrice },
    functions: { setCart },
  }), [cart, cartTotalPrice]);

  /*
        const productsToStorage = products.filter((prod) => prod.quantity !== 0)
      .map((prod) => {
        prod.subTotal = prod.price * prod.quantity;
        return prod;
      });

    localStorage.setItem('carrinho', JSON.stringify({
      products: productsToStorage,
      totalPrice: productsToStorage.map((prod) => prod.subTotal)
        .reduce((prev, crr) => prev + crr, 0).toFixed(2).toString()
        .replace('.', ','),
    }));

    const recoveredCart = JSON.parse(localStorage.getItem('carrinho'));

    if (recoveredCart.products.length > 0) {
      setIsCheckoutButtonDisabled(false);
    } else {
      setIsCheckoutButtonDisabled(true);
    }
  */

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
