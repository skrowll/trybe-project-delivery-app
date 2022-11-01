import { useContext, useEffect } from 'react';
import DeliveryContext from '../context/DeliveryContext';
import { requestProducts } from '../services/requests';

function Products() {
  const { setProducts } = useContext(DeliveryContext);

  useEffect(() => {
    const productsList = requestProducts('/customer/products');
    setProducts(productsList);
  }, [setProducts]);

  return (
    <h1>OI</h1>
  );
}

export default Products;
