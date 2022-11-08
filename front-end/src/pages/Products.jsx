import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../services/requests';

import DeliveryContext from '../context/DeliveryContext';
import Navbar from '../components/Navbar';

function Products() {
  const navigate = useNavigate();

  const {
    values: { cartTotalPrice },
    functions: { setCart },
  } = useContext(DeliveryContext);

  const [products, setProducts] = useState([]);

  useEffect(() => request('get', '/customer/products')
    .then((data) => {
      setProducts(data.map((e) => { e.quantity = 0; return e; }));
    }), []);

  useEffect(() => {
    const wereFound = products.filter(({ quantity }) => quantity > 0);
    setCart(wereFound);
  }, [products, setCart]);

  const inputNumberHandler = ({ name, value }) => {
    const updated = products.map((e) => {
      if (e.name === name) e.quantity = +value;
      return e;
    });

    setProducts(updated);
  };

  const buttonHandler = ({ name, value }, index) => {
    const magicNumber = -1;
    const numberAddOrRm = (value.includes('+')) ? 1 : magicNumber;

    value = products[index].quantity + numberAddOrRm;
    value = value > magicNumber ? value : 0;

    inputNumberHandler({ name, value });
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
        <span>{cartTotalPrice.toFixed(2).replace('.', ',')}</span>
      </button>
      <section className="product-cards">
        {
          products.map(({ id, name, price, urlImage }, index) => (
            <div key={ id }>
              <h1 data-testid={ `customer_products__element-card-title-${id}` }>
                {name}
              </h1>
              <img
                src={ urlImage }
                alt={ name }
                height="100px"
                data-testid={ `customer_products__img-card-bg-image-${id}` }
              />
              <h3 data-testid={ `customer_products__element-card-price-${id}` }>
                { `R$${price.toString().replace('.', ',')}` }
              </h3>
              <div className="card-controls">
                <button
                  data-testid={ `customer_products__button-card-rm-item-${id}` }
                  onClick={ ({ target }) => buttonHandler(target, index) }
                  name={ name }
                  type="button"
                  value="-"
                >
                  -
                </button>
                <input
                  data-testid={ `customer_products__input-card-quantity-${id}` }
                  type="number"
                  name={ name }
                  value={ products[index].quantity }
                  min="0"
                  onChange={ ({ target }) => inputNumberHandler(target) }
                />
                <button
                  data-testid={ `customer_products__button-card-add-item-${id}` }
                  onClick={ ({ target }) => buttonHandler(target, index) }
                  name={ name }
                  type="button"
                  value="+"
                >
                  +
                </button>
              </div>
            </div>
          ))
        }
      </section>
    </>
  );
}

export default Products;
