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
  const [quantity, setQuantity] = useState({});

  useEffect(() => request('get', '/customer/products')
    .then((data) => {
      setProducts(data);
      setQuantity(data.reduce((acc, { name }) => {
        acc[name] = 0;
        return acc;
      }, {}));
    }), [setCart]);

  // const updateCart = (id, price, { value, buttonAction }) => {
  //   const { totalPrice, products: prod } = cart;

  //   const magicNumber = -1;
  //   const numberAddOrRm = (buttonAction === 'add_button') ? 1 : magicNumber;

  //   if (prod.every((product) => product.id !== id)) {
  //     const productFound = products.filter((product) => product.id === id)[0];

  //     const quantity = Number(value);

  //     productFound.quantity = quantity;
  //     productFound.subTotal = quantity * price;

  //     setCart(({ totalPrice, products: [...prod, productFound] }));
  //   }

  //   cart.map((product) => {
  //     if (product.id === product.id) {
  //       if (buttonAction === 'add_button') {
  //         product.quantity += 1;
  //         return product;
  //       }

  //       product.quantity = product.quantity === 0 ? 0 : product.quantity - 1;
  //       return product;
  //     }

  //     return product;
  //   });

  //   setCart(newProducts); // Atualiza o carrinho do estado local
  // };

  const inputNumberHandler = ({ name, value }) => {
    setQuantity((prev) => ({ ...prev, [name]: +value }));

    // const newProducts = cart.map((prod) => { // Retorna um array com quantidades atualizadas
    //   if (prod.name === name) {
    //     prod.quantity = Number(value);
    //     return prod;
    //   }

    //   return prod;
    // });

    // setCart(newProducts); // Atualiza o carrinho do estado local
  };

  const buttonHandler = ({ name, value }) => {
    const magicNumber = -1;
    const numberAddOrRm = (value.includes('+')) ? 1 : magicNumber;

    value = quantity[name] + numberAddOrRm;
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
        <span>{cart.totalPrice}</span>
      </button>
      <section className="product-cards">
        {
          products.map(({ id, name, price, urlImage }) => (
            <div
              key={ uuidv4() }
            >
              <img
                src={ urlImage }
                alt={ name }
                height="100px"
                data-testid={ `customer_products__img-card-bg-image-${id}` }
              />
              <span data-testid={ `customer_products__element-card-title-${id}` }>
                {name}
              </span>
              <span data-testid={ `customer_products__element-card-price-${id}` }>
                {price.toString().replace('.', ',')}
              </span>
              <div className="card-controls">
                <input
                  data-testid={ `customer_products__button-card-rm-item-${id}` }
                  type="button"
                  name={ name }
                  value="-"
                  onClick={ ({ target }) => buttonHandler(target) }
                />
                <input
                  data-testid={ `customer_products__input-card-quantity-${id}` }
                  type="number"
                  name={ name }
                  value={ quantity[name] } // Puxa os valores dos inputs do carrinho do estado local, todos iniciam com 0, a posição de cada produto é seu ID menos um.
                  min="0"
                  onChange={ ({ target }) => inputNumberHandler(target) }
                />
                <input
                  data-testid={ `customer_products__button-card-add-item-${id}` }
                  type="button"
                  name={ name }
                  value="+"
                  onClick={ ({ target }) => buttonHandler(target) }
                />
              </div>
            </div>
          ))
        }
      </section>
    </>
  );
}

export default Products;
