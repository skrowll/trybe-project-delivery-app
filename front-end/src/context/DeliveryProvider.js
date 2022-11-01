import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import JWTDecode from 'jwt-decode';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [user, setUser] = useState({});

  function setUserProfileToState() {
    const userToken = localStorage.getItem('token');
    const userEntity = JWTDecode(userToken);
    setUser(userEntity);
  }

  const providerContext = useMemo(() => ({
    user,
    setUserProfileToState,
  }), [user]);

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
