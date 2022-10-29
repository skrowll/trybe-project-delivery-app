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
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const MIN_PASSWORD_LENGTH = 6;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)?$/i;

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

  const login = async (event) => {
    event.preventDefault();
    try {
      const { token, role } = await requestLogin('/login', loginInputs);

      setToken(token);

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      setIsLogged(true);
    } catch (error) {
      console.log(error);
      setIsLogged(false);
    }
  };

  if (isLogged) return navigate('/xablau');

  return (
    <section className="login">
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
            onClick={ (event) => login(event) }
            data-testid="common_login__button-login"
            disabled={ isButtonDisabled }
          >
            <span>LOGIN</span>
          </button>
          <button
            type="button"
            onClick={ () => navigate('/register') }
            data-testid="common_login__button-login"
          >
            <span>Ainda não tenho conta</span>
          </button>
        </form>
      </div>
    </section>
  );
}
