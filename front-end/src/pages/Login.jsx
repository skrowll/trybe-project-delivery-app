import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestLogin, setToken } from '../services/requests';

export default function Login() {
  const navigate = useNavigate();
  const [loginInputs, setLoginInputs] = useState({
    email: '',
    password: '',
  });
  const [isButtonDisabled, setDisabled] = useState(true);
  const [failedLogin, setFailedLogin] = useState(false);

  useEffect(() => {
    const MIN_PASSWORD_LENGTH = 6;
    const emailRegex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    const isEmailValid = emailRegex.test(loginInputs.email);
    const isPasswordValid = loginInputs.password.length >= MIN_PASSWORD_LENGTH;

    const validations = [isEmailValid, isPasswordValid];
    const validate = validations.every((valid) => valid === true);

    if (validate) {
      return setDisabled(false);
    }

    setDisabled(true);
  }, [loginInputs]);

  const handleChangeLogin = ({ target }) => {
    const { name, value } = target;
    setLoginInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const login = async () => {
    try {
      const { token, role, name, email } = await requestLogin('/login', loginInputs);

      setToken(token);

      localStorage.setItem('user', JSON.stringify({ name, email, role, token }));

      if (role === 'customer') navigate('/customer/products');
      if (role === 'seller') navigate('/seller/orders');
      if (role === 'administrator') navigate('/admin/manage');
    } catch (error) {
      setFailedLogin(true);
    }
  };

  useEffect(() => {
    const userLogged = JSON.parse(localStorage.getItem('user'));
    if (userLogged?.role === 'customer') navigate('/customer/products');
    if (userLogged?.role === 'seller') navigate('/seller/orders');
  });

  return (
    <section className="login-section">
      <div className="login-modal">
        <div className="fake-logo" />
        <form>
          <input
            name="email"
            type="text"
            onChange={ handleChangeLogin }
            value={ loginInputs.email }
            placeholder="email@trybeer.com.br"
            data-testid="common_login__input-email"
          />
          <input
            name="password"
            type="password"
            onChange={ handleChangeLogin }
            value={ loginInputs.password }
            data-testid="common_login__input-password"
          />
          <button
            type="button"
            onClick={ login }
            data-testid="common_login__button-login"
            disabled={ isButtonDisabled }
          >
            <span>LOGIN</span>
          </button>
          <button
            type="button"
            onClick={ () => navigate('/register') }
            data-testid="common_login__button-register"
          >
            <span>Ainda não tenho conta</span>
          </button>
          <div
            style={ { display: (failedLogin ? 'block' : 'none') } }
            data-testid="common_login__element-invalid-email"
          >
            Email ou senha incorretos
          </div>
        </form>
      </div>
    </section>
  );
}
