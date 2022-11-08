import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { request } from '../services/requests';

function CardAdressDetails() {
  // const navigate = useNavigate();
  const [seller, setSeller] = useState('');
  const [fullAddress, setFullAddress] = useState([{
    address: '',
    number: 0,
  }]);
  const [listSeller, setListSeller] = useState([]);

  const user = localStorage.getItem('user');
  console.log(user);
  // const sale = {
  //   // userId: user.id,
  //   // sellerId: ,
  //   totalPrice,
  //   deliveryAddress,
  //   deliveryNumber,
  // };

  useEffect(() => request('get', '/user?role=seller')
    .then((data) => {
      setListSeller(data.map((e) => e));
    }), []);

  return (
    <>
      <h2>Detalhe e Endereço para Entrega</h2>
      <fieldset>
        <span>Vendedor(a)</span>
        <select
          data-testid="customer_checkout__select-seller"
          id="sellers"
          name="sellers"
          onClick={ ({ target: { value } }) => setSeller(value) }
        >
          {listSeller.length > 0
            && listSeller.map(({ name }) => (
              <option key={ name } value={ name }>
                {name}
              </option>
            ))}
        </select>
        <span>Endereço</span>
        <input
          data-testid="customer_checkout__input-address"
          type="text"
          value={ fullAddress.address }
          // onChange={ ({ target: { value } }) => getAdress(value) }
          onChange={ ({ target: { value } }) => {
            setFullAddress((prev) => [...prev, { address: value }]);
          } }
        />
        <span>Número</span>
        <input
          data-testid="customer_checkout__input-address-number"
          type="number"
          value={ fullAddress.number }
          // onChange={ ({ target: { value } }) => getAdress(value) }
          onChange={ ({ target: { value } }) => {
            setFullAddress((prev) => [...prev, { number: value }]);
          } }
        />
        <input
          type="button"
          value="Finalizar Pedido"
          onClick={ () => console.log(fullAddress) }
          // onClick={ () => navigate('/customer/orders/<id>') }
        />
      </fieldset>
      <span>
        {seller}
      </span>
    </>
  );
}

export default CardAdressDetails;
