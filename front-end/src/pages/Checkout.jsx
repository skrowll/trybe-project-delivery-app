import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { genericRequest } from '../services/requests';

// import DeliveryContext from '../context/DeliveryContext';
// import Navbar from '../components/Navbar';

function Checkout() {
  const [count, setCount] = useState([]);

  return (
    <>
      <h1>{ JSON.stringify(count) }</h1>
      <button
        type="button"
        onClick={ () => setCount((prev) => [...prev, prev.length]) }
      >
        oie
      </button>
    </>
  );
}

export default Checkout;
