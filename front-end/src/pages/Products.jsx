import { useContext, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DeliveryContext from '../context/DeliveryContext';
import { requestProducts } from '../services/requests';

function Products() {
  const { products, setProducts } = useContext(DeliveryContext);

  const fetchProducts = useCallback(async () => {
    const productsList = await requestProducts('/customer/products');
    setProducts(productsList);
  }, [setProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section className="product-cards">
      {products.length > 0 && products.map((prod) => {
        const { id, name, price, urlImage } = prod;

        return (
          <div
            key={ uuidv4() }
            data-testid={ `customer_products__element-card-price-${id}` }
          >
            <img src={ urlImage } alt={ name } />
            <span>{name}</span>
            <span>{price}</span>
          </div>
        );
      })}
    </section>
  );
}

export default Products;
