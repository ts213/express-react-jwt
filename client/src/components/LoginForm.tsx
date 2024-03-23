import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../store/userStore';

export const LoginForm = observer(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const store = useContext(StoreContext);

  return (
    <div>
      <input
        onChange={e => setEmail(e.target.value)}
        value={email}
        type='text'
        placeholder='Email'
      />
      <input
        onChange={e => setPassword(e.target.value)}
        value={password}
        type='password'
        placeholder='Пароль'
      />
      <button onClick={() => store.login(email, password)}>
        Логин
      </button>
      <button onClick={() => store.registration(email, password)}>
        Регистрация
      </button>
    </div>
  );
});
