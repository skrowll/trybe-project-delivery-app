import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request, setToken } from '../services/requests';

function CardAdressDetails({ cart, cartTotalPrice }) {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [number, setNumberAddress] = useState(0);
  const [listSeller, setListSeller] = useState([]);
  const { token } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => request('get', '/user?role=seller')
    .then((data) => {
      setListSeller(data.map((e) => e));
    }), []);

  const submitCheckout = async () => {
    const checkout = {
      sale: {
        sellerId,
        totalPrice: cartTotalPrice,
        deliveryAddress: address,
        deliveryNumber: Number(number),
      },
      cart,
    };
    setToken(token);
    const order = await request('post', '/customer/checkout', checkout);
    navigate(`/customer/orders/${order}`);
    // TODO: autorização mesmo depois de atualizar página
  };

  return (
    <>
      <h2>Detalhe e Endereço para Entrega</h2>
      <fieldset>
        <span>P. Vendedora Responsável</span>
        <select
          id="sellers"
          name="sellers"
          data-testid="customer_checkout__select-seller"
          onChange={ ({ target: { value } }) => setSellerId(value) }
        >
          <option>Selecione</option>
          {listSeller.length > 0
            && listSeller.map((item, index) => (
              <option
                key={ index }
                value={ item.id }
              >
                {item.name}
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
          onClick={ submitCheckout }
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </fieldset>
    </>
  );
}

CardAdressDetails.propTypes = {
  cart: propTypes.arrayOf.isRequired,
  cartTotalPrice: propTypes.number.isRequired,
};

export default CardAdressDetails;
