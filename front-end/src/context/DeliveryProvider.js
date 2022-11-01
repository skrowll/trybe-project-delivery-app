import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import JWTDecode from 'jwt-decode';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [user, setUser] = useState({});

  const decodeJWTGetUser = useCallback(() => {
    const userToken = localStorage.getItem('token');
    const userEntity = JWTDecode(userToken);
    return userEntity;
  }, []);

  const providerContext = useMemo(() => ({
    user,
    setUser,
    decodeJWTGetUser,
  }), [user, decodeJWTGetUser]);

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
