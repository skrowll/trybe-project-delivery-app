import { useState, useEffect } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

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
  }, [name, email, password]);

  const register = (e) => {
    e.preventDefault();
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
    </section>
  );
}

export default Register;
