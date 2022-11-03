import { useContext, useEffect, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DeliveryContext from '../context/DeliveryContext';
import { requestProducts } from '../services/requests';

function Products() {
  const { products, setProducts } = useContext(DeliveryContext);
  const [cartItems, setCartItems] = useState([]);

  const fetchProducts = useCallback(async () => {
    const productsList = await requestProducts('/customer/products');
    const productListWithQuantity = productsList.map((prod) => ({
      ...prod,
      price: Number(prod.price),
      quantity: 0,
    }));
    setCartItems(productListWithQuantity);
    setProducts(productsList);
  }, [setProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const cartItemsToStorage = cartItems.filter((prod) => prod.quantity !== 0);
    localStorage.setItem('carrinho', JSON.stringify(cartItemsToStorage));
  }, [cartItems]);

  const updateCart = (product, buttonAction) => {
    const newCart = cartItems.map((prod) => {
      if (prod.id === product.id) {
        if (buttonAction === 'add_button') {
          prod.quantity += 1;
          return prod;
        }

        prod.quantity = prod.quantity === 0 ? 0 : prod.quantity - 1;
        return prod;
      }

      return prod;
    });

    setCartItems(newCart);
  };

  const handleInputsChange = (event) => { // Lida com a mudança do input por digitação
    event.preventDefault();
    const { name, value } = event.target;
    const newCart = cartItems.map((prod) => {
      if (prod.name === name) {
        prod.quantity = Number(value);
        return prod;
      }

      return prod;
    });

    setCartItems(newCart);
  };

  const handleButtonChange = (event, product) => {
    const { name: buttonAction } = event.target;
    updateCart(product, buttonAction);
  };

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
                name="rm_button"
                type="button"
                data_testid={ `customer_products__button-card-rm-item-${id}` }
                onClick={ (e) => handleButtonChange(e, prod) }
              >
                -
              </button>
              <input
                name={ name }
                type="number"
                min="0"
                data_testid={ `customer_products__input-card-quantity-${id}` }
                onChange={ handleInputsChange }
                value={ cartItems[(id - 1)].quantity }
              />
              <button
                name="add_button"
                type="button"
                data_testid={ `customer_products__button-card-add-item-${id}` }
                onClick={ (e) => handleButtonChange(e, prod) }
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Products;
