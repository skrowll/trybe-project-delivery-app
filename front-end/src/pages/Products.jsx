import { useContext, useEffect, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DeliveryContext from '../context/DeliveryContext';
import { requestProducts } from '../services/requests';

function Products() {
  const {
    setIsCheckoutButtonDisabled,
    setCartTotalPrice,
    setGlobalCart,
  } = useContext(DeliveryContext);

  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    const productsList = await requestProducts('/customer/products')
      .then((response) => response.map((prod) => {
        if (prod.quantity) {
          return {
            ...prod,
            price: Number(prod.price),
            subTotal: 0,
          };
        }

        return {
          ...prod,
          price: Number(prod.price),
          quantity: 0,
          subTotal: 0,
        };
      }));

    setProducts(productsList);
  }, []);

  useEffect(() => { // Chama a função que recupera os produtos do back-end
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => { // Toda vez que o carrinho do estado local atualiza adiciona ao carrinho no localStorage todos os produtos com quatidade maior que 0
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
      setCartTotalPrice(recoveredCart.totalPrice);
      setGlobalCart(recoveredCart);
    } else {
      setIsCheckoutButtonDisabled(true);
      setCartTotalPrice(0);
      setGlobalCart(recoveredCart);
    }
  }, [products, setIsCheckoutButtonDisabled, setCartTotalPrice, setGlobalCart]);

  const updateCart = (product, buttonAction) => {
    const newProducts = products.map((prod) => {
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

    setProducts(newProducts); // Atualiza o carrinho do estado local
  };

  const handleInputsChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const newProducts = products.map((prod) => { // Retorna um array com quantidades atualizadas
      if (prod.name === name) {
        prod.quantity = Number(value);
        return prod;
      }

      return prod;
    });

    setProducts(newProducts); // Atualiza o carrinho do estado local
  };

  const handleButtonChange = (event, product) => {
    const { name: buttonAction } = event.target;
    updateCart(product, buttonAction); // Chama a função que atualiza o carrinho dependendo do botão clicado
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
              height="100px"
              data-testid={ `customer_products__img-card-bg-image-${id}` }
            />
            <span
              data-testid={ `customer_products__element-card-title-${id}` }
            >
              {name}
            </span>
            <span
              data-testid={ `customer_products__element-card-price-${id}` }
            >
              {price.toString().replace('.', ',')}
            </span>
            <div className="card-controls">
              <button
                name="rm_button"
                type="button"
                data-testid={ `customer_products__button-card-rm-item-${id}` }
                onClick={ (e) => handleButtonChange(e, prod) }
              >
                -
              </button>
              <input
                name={ name }
                type="number"
                min="0"
                data-testid={ `customer_products__input-card-quantity-${id}` }
                onChange={ handleInputsChange }
                value={ products[(id - 1)]?.quantity } // Puxa os valores dos inputs do carrinho do estado local, todos iniciam com 0, a posição de cada produto é seu ID menos um.
              />
              <button
                name="add_button"
                type="button"
                data-testid={ `customer_products__button-card-add-item-${id}` }
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
