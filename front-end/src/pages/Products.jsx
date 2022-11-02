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
          >
            <img
              src={ urlImage }
              alt={ name }
              data_testid={ `customer_products__img-card-bg-image-${id}` }
            />
            <span
              data-testid={ `customer_products__element-card-title-${id}` }
            >
              {name}
            </span>
            <span
              data-testid={ `customer_products__element-card-price-${id}` }
            >
              {price}
            </span>
            <div className="card-controls">
              <button
                type="button"
                data_testid={ `customer_products__button-card-add-item-${id}` }
              >
                +
              </button>
              <label htmlFor="item_quantity">
                <input
                  id="item_quantity"
                  type="text"
                  data_testid={ `customer_products__input-card-quantity-${id}` }
                />
              </label>
              <button
                type="button"
                data_testid={ `customer_products__button-card-rm-item-${id}` }
              >
                -
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Products;
