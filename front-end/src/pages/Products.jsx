import { useContext, useEffect, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DeliveryContext from '../context/DeliveryContext';
import { requestProducts } from '../services/requests';

function Products() {
  const { products, setProducts } = useContext(DeliveryContext);
  const [productToCart, setProductToCart] = useState({}); // Produto atual a ser manipulado, definido quando digito o valor ou aumento/diminuo
  const [productInputs, setProductInputs] = useState({}); // Inputs dinâmicos de cada produto da página
  const [cartItems, setCartItems] = useState([]); // Estado local do carrinho de compras

  const fetchProducts = useCallback(async () => { // Recupera os produtos do backend
    const productsList = await requestProducts('/customer/products');
    setProducts(productsList);
  }, [setProducts]);

  useEffect(() => { // Recupera os produtos do backend
    fetchProducts();
  }, [fetchProducts]);

  const verifyProductOnCart = useCallback(() => { // Verifica se o produto que estou manipulando já existe no carrinho
    const MIN_NUMBER = -1;
    const productExistOnCart = cartItems
      .findIndex((prod) => prod.id === productToCart.id);

    if (productExistOnCart > MIN_NUMBER) { // Caso exista o carrinho é copiado, editado e atualizado
      const newCart = cartItems;
      newCart[productExistOnCart].quantity = productInputs[productToCart.name];
      setCartItems(newCart);
      return true;
    }

    return false;
  }, [cartItems, productToCart, productInputs]);

  useEffect(() => { // Salva carrinho no LocalStorage
    localStorage.setItem('carrinho', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => { // Adiciona um novo produto ao carrinho
    if (Object.keys(productInputs).length > 0) {
      const isProductAlreadyAdded = verifyProductOnCart();

      if (isProductAlreadyAdded) return null;

      setCartItems((prev) => [...prev, {
        ...productToCart,
        quantity: productInputs[productToCart.name]
          ? productInputs[productToCart.name] : 1,
      }]);
    }
  }, [productInputs, productToCart, verifyProductOnCart]);

  const handleInputsChange = (event, product) => { // Lida com a mudança do input por digitação
    event.preventDefault();
    const { name, value } = event.target;
    setProductToCart(product); // Guarda o produto que está sendo manipulado no estado
    setProductInputs({ // Cria dinâmicamente um estado para o input do produto atual
      ...productInputs,
      [name]: Number(value),
    });
  };
  const handleButtonChange = (name, event, product) => { // Lida com a mudança do input por botões
    const { name: buttonAction } = event.target;
    setProductToCart(product); // Guarda o produto que está sendo manipulado no estado
    if (productInputs[name] === undefined) {
      setProductInputs({ // Cria dinâmicamente um estado para o input do produto atual
        ...productInputs,
        [name]: 1,
      });

      return null;
    }
    if (buttonAction === 'add_button') {
      setProductInputs({ // Adiciona +1 ao estado do input do produto atual
        ...productInputs,
        [name]: productInputs[name] + 1,
      });

      return null;
    }
    if (buttonAction === 'rm_button') {
      if (productInputs[name] === 0) return null; // Caso o valor do input do produto atual seja 0, a operação de remover um produto não é executada.
      setProductInputs({ // Subtraí -1 do estado do input do produto atual
        ...productInputs,
        [name]: productInputs[name] - 1,
      });

      return null;
    }
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
                name="add_button"
                type="button"
                data_testid={ `customer_products__button-card-add-item-${id}` }
                onClick={ (e) => handleButtonChange(name, e, prod) }
              >
                +
              </button>
              <input
                name={ name }
                type="number"
                min="0"
                data_testid={ `customer_products__input-card-quantity-${id}` }
                onChange={ (e) => handleInputsChange(e, prod) }
                value={ productInputs[name] }
              />
              <button
                name="rm_button"
                type="button"
                data_testid={ `customer_products__button-card-rm-item-${id}` }
                onClick={ (e) => handleButtonChange(name, e, prod) }
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
