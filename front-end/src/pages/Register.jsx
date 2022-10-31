import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestRegister, setToken } from '../services/requests';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [failedRegister, setFailedRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const MIN_PASS = 6;
    const MIN_NAME = 12;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const invalidName = !name.length || name.length < MIN_NAME;
    const invalidEmail = !email.length || !emailRegex.test(email);
    const invalidPassword = !password.length || password.length < MIN_PASS;
    if (invalidName || invalidEmail || invalidPassword) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    setFailedRegister(false);
  }, [name, email, password]);

  const register = async (e) => {
    e.preventDefault();
    try {
      const registerInputs = { name, email, password };
      const { token, role } = await requestRegister('/register', registerInputs);

      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      if (role === 'customer') navigate('/customer/products');
      if (role === 'seller') navigate('/seller/orders');
      if (role === 'administrator') navigate('/admin/manage');
    } catch (error) {
      setFailedRegister(true);
    }
  };

  return (
    <section>
      <h1>CADASTRO</h1>
      <form>
        <input
          type="text"
          placeholder="Seu nome"
          data-testid="common_register__input-name"
          value={ name }
          onChange={ ({ target }) => setName(target.value) }
        />
        <input
          type="email"
          placeholder="seu-email@site.com.br"
          data-testid="common_register__input-email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          type="password"
          placeholder="Sua senha"
          data-testid="common_register__input-password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          type="submit"
          data-testid="common_register__button-register"
          disabled={ isDisabled }
          onClick={ register }
        >
          REGISTER
        </button>
      </form>
      <div
        style={ { display: failedRegister ? 'block' : 'none' } }
        data-testid="common_register__element-invalid_register"
      >
        Este usuário já existe!
      </div>
    </section>
  );
}

export default Register;
