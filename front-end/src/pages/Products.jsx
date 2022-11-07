import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../services/requests';

import DeliveryContext from '../context/DeliveryContext';
import Navbar from '../components/Navbar';

function Products() {
  const navigate = useNavigate();

  const {
    values: { cart, cartTotalPrice },
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

  const inputNumberHandler = ({ name, value }, index) => {
    const updated = products.map((e) => {
      if (e.name === name) e.quantity = +value;
      return e;
    });

    setProducts(updated);
    setCart((prev) => prev.map((item) => {
      if (updated[index].name === item.name) return updated[index];
      return item;
    }));

    // const newProducts = cart.map((prod) => { // Retorna um array com quantidades atualizadas
    //   if (prod.name === name) {
    //     prod.quantity = Number(value);
    //     return prod;
    //   }

    //   return prod;
    // });

    // setCart(newProducts); // Atualiza o carrinho do estado local
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
        <span>{cartTotalPrice}</span>
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
                <input
                  data-testid={ `customer_products__button-card-rm-item-${id}` }
                  type="button"
                  name={ name }
                  value="-"
                  onClick={ ({ target }) => buttonHandler(target, index) }
                />
                <input
                  data-testid={ `customer_products__input-card-quantity-${id}` }
                  type="number"
                  name={ name }
                  value={ products[index].quantity }
                  min="0"
                  onChange={ ({ target }) => inputNumberHandler(target, index) }
                />
                <input
                  data-testid={ `customer_products__button-card-add-item-${id}` }
                  type="button"
                  name={ name }
                  value="+"
                  onClick={ ({ target }) => buttonHandler(target, index) }
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
