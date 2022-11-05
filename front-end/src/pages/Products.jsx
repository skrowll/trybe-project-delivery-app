import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../components/Navbar';

import DeliveryContext from '../context/DeliveryContext';
import { request } from '../services/requests';

function Products() {
  const navigate = useNavigate();

  const {
    values: { cart },
    functions: { setCart },
  } = useContext(DeliveryContext);

  const [products, setProducts] = useState([]);

  useEffect(() => request('get', '/customer/products')
    .then((data) => {
      setProducts(data);
      setCart(data.map((e) => (
        { ...e, quantity: 0, subTotat: 0 }
      )));
    }), [setCart]);

  const updateCart = (product, buttonAction) => {
    const newProducts = cart.map((prod) => {
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

    setCart(newProducts); // Atualiza o carrinho do estado local
  };

  const handleInputsChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const newProducts = cart.map((prod) => { // Retorna um array com quantidades atualizadas
      if (prod.name === name) {
        prod.quantity = Number(value);
        return prod;
      }

      return prod;
    });

    setCart(newProducts); // Atualiza o carrinho do estado local
  };

  const handleButtonChange = (event, product) => {
    const { name: buttonAction } = event.target;
    updateCart(product, buttonAction); // Chama a função que atualiza o carrinho dependendo do botão clicado
  };

  return (
    <>
      <Navbar />
      <button
        name="checkout_button"
        type="button"
        onClick={ () => navigate('/customer/checkout') }
        data-testid="customer_products__checkout-bottom-value"
      >
        <span>{cart.totalPrice}</span>
      </button>
      <section className="product-cards">
        {
          products.map((prod) => {
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
                    value={ cart[(id - 1)]?.quantity } // Puxa os valores dos inputs do carrinho do estado local, todos iniciam com 0, a posição de cada produto é seu ID menos um.
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
          })
        }
      </section>
    </>
  );
}

export default Products;
