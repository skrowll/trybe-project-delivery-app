import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [loginInputs, setLoginInputs] = useState({
    email: '',
    password: '',
  });
  const [isButtonDisabled, setDisabled] = useState(true);

  useEffect(() => {
    const MIN_PASSWORD_LENGTH = 6;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

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
            // onClick={}
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
