import { useContext, useEffect, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DeliveryContext from '../context/DeliveryContext';
import { requestProducts } from '../services/requests';

function Products() {
  const { products, setProducts } = useContext(DeliveryContext);
  const [quantity, setQuantity] = useState(0); // Quantidade do produto
  const [cartState, setCartState] = useState([]); // Array com produtos manipulados

  const fetchProducts = useCallback(async () => {
    const productsList = await requestProducts('/customer/products');
    setProducts(productsList);
  }, [setProducts]); // Requisição da lista de produtos do back-end

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(cartState));
  }, [cartState]); // Cria um novo array com os produtos manipulados no LocalStorage

  const handleCardControls = (event, product) => {
    event.preventDefault();
    const { name } = event.target;
    if (name === 'add_button') {
      setQuantity(Number(quantity) + 1);
      return setCartState([...cartState, {
        id: product.id,
        name: product.name,
        urlImage: product.urlImage,
        quantity,
      }]); // Caso seja feito um clique no botão de adicionar será incrementado + 1 ao estado quantity, dai será atualizado o estado do array de produtos manipulados, toda vez que esse array é alterado o useEffect acima é chamado e é criado um novo array no LocalStorage.
    }
    if (name === 'rm_button' && quantity - 1 >= 0) {
      setQuantity(Number(quantity) - 1);
      return setCartState([...cartState, {
        id: product.id,
        name: product.name,
        urlImage: product.urlImage,
        quantity,
      }]); // Caso seja feito um clique no botão de adicionar será decrementado - 1 ao estado quantity, dai será atualizado o estado do array de produtos manipulados, toda vez que esse array é alterado o useEffect acima é chamado e é criado um novo array no LocalStorage.
    }
  };

  const handleCardChange = (event, product) => {
    event.preventDefault();
    const { value } = event.target;
    if (value >= 0) {
      setQuantity(value);
      return setCartState([...cartState, {
        id: product.id,
        name: product.name,
        urlImage: product.urlImage,
        quantity,
      }]); // Caso seja alterado o campo de valor da quantidade de produtos será alterado também o número do estado quantity, dai será atualizado o estado do array de produtos manipulados, toda vez que esse array é alterado o useEffect acima é chamado e é criado um novo array no LocalStorage.
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
                onClick={ (e) => handleCardControls(e, prod) }
              >
                +
              </button>
              <label htmlFor="item_quantity">
                <input
                  name="item_quantity"
                  type="number"
                  min="0"
                  data_testid={ `customer_products__input-card-quantity-${id}` }
                  onChange={ (e) => handleCardChange(e, prod) }
                />
              </label>
              <button
                name="rm_button"
                type="button"
                data_testid={ `customer_products__button-card-rm-item-${id}` }
                onClick={ (e) => handleCardControls(e, prod) }
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

// setQuantity(Number(quantity) - 1);
//       const oldCartStored = JSON.parse(localStorage.getItem('carrinho'));

//       const cartElementIndex = oldCartStored
//         .findIndex((prod) => prod.id === product.id);

//       if (cartElementIndex) {
//         const actualCart = cartState;
//         actualCart[cartElementIndex] = {
//           id: product.id,
//           name: product.name,
//           urlImage: product.urlImage,
//           quantity,
//         };
//         return setCartState([...actualCart]);
//       }

//       return setCartState([...cartState, {
//         id: product.id,
//         name: product.name,
//         urlImage: product.urlImage,
//         quantity,
//       }]);
