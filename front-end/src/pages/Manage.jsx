import { useState, useEffect } from 'react';
import { setToken, requestAdminRegister } from '../services/requests';

function Manage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [isDisabled, setIsDisabled] = useState(true);
  const [failedRegister, setFailedRegister] = useState(false);

  useEffect(() => {
    const MIN_PASS = 6;
    const MIN_NAME = 12;
    const emailRegex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
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

  const adminRegister = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      setToken(token);
      const registerInputs = { name, email, password, role };
      await requestAdminRegister('/admin/manage', registerInputs);
    } catch (error) {
      console.log(error);
      setFailedRegister(true);
    }
  };

  return (
    <section className="manage-section">
      <form>
        <h1>Cadastrar novo usuário</h1>
        <input
          data-testid="admin_manage__input-name"
          name="name"
          type="text"
          value={ name }
          placeholder="Nome e sobrenome"
          onChange={ ({ target }) => setName(target.value) }
        />
        <input
          data-testid="admin_manage__input-email"
          name="email"
          type="text"
          value={ email }
          placeholder="seu-email@site.com.br"
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          data-testid="admin_manage__input-password"
          name="password"
          type="password"
          value={ password }
          placeholder="******"
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <select
          data-testid="admin_manage__select-role"
          name="role"
          value={ role }
          defaultValue="customer"
          onChange={ ({ target }) => setRole(target.value) }
        >
          <option value="seller">vendedor</option>
          <option value="customer">cliente</option>
          <option value="administrator">administrador</option>
        </select>
        <button
          data-testid="admin_manage__button-register"
          type="button"
          disabled={ isDisabled }
          onClick={ (event) => adminRegister(event) }
        >
          <span>CADASTRAR</span>
        </button>
      </form>
      <div
        style={ { display: failedRegister ? 'block' : 'none' } }
        data-testid="admin_manage__element-invalid-register"
      >
        Não foi possivel registrar um novo usuário!
      </div>
    </section>
  );
}

export default Manage;
