import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { request } from '../services/requests';

function CardAdressDetails({ cart, cartTotalPrice }) {
  // const navigate = useNavigate();
  const [seller, setSeller] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumberAddress] = useState(0);
  const [listSeller, setListSeller] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const checkout = {
      sale: {
        userId: user.id,
        sellerId: 1,
        totalPrice: cartTotalPrice,
        deliveryAddress: address,
        deliveryNumber: Number(number),
      },
      cart,
    };
    console.log(checkout);
  }, [address, number, cart, cartTotalPrice]);

  useEffect(() => request('get', '/user?role=seller')
    .then((data) => {
      setListSeller(data.map((e) => e));
    }));

  const sendRequest = () => {
    console.log('meh');
    // const response = request('get', '/customer/checkout', { checkout })
    //   .then((data) => {
    //     setListSeller(data.map((e) => e));
    //   });

    // console.log(response);
    // navigate('/customer/orders/<id>');
  };

  return (
    <>
      <h2>Detalhe e Endereço para Entrega</h2>
      <fieldset>
        <span>Vendedor(a)</span>
        <select
          id="sellers"
          name="sellers"
          data-testid="customer_checkout__select-seller"
          onClick={ ({ target: { value } }) => setSeller(value) }
        >
          {listSeller.length > 0
            && listSeller.map(({ name }) => (
              <option
                key={ name }
                value={ name }
              >
                {name}
              </option>
            ))}
        </select>
        <span>Endereço</span>
        <input
          data-testid="customer_checkout__input-address"
          type="text"
          value={ address }
          onChange={ ({ target: { value } }) => setAddress(value) }
        />
        <span>Número</span>
        <input
          data-testid="customer_checkout__input-address-number"
          type="number"
          value={ number }
          onChange={ ({ target: { value } }) => setNumberAddress(value) }
        />
        <button
          type="button"
          // value="Finalizar Pedido"
          onClick={ sendRequest }
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </fieldset>
      <span
        onChange={ ({ target: { value } }) => setSeller(value) }
      >
        {seller}
      </span>
    </>
  );
}

CardAdressDetails.propTypes = {
  cart: propTypes.arrayOf().isRequired,
  cartTotalPrice: propTypes.number.isRequired,
};

export default CardAdressDetails;
