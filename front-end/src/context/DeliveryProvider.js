import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const providerContext = useMemo(() => ({
    // Adicione os items a serem compartilhados pela aplicação aqui.
  }), []);

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
