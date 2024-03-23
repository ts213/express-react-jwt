import React, { useContext, useState } from 'react';
import { StoreContext } from '../store/userStore';
import { UserT } from '..//types/UserT';
import UserService from '../services/UserService';

export function UserTab() {
  const store = useContext(StoreContext);
  const [users, setUsers] = useState<UserT[]>([]);

  async function getUsers() {
    await UserService.fetchUsers()
      .then(res => setUsers(res.data));
  }

  return (
    <div>
      {users.map(user =>
        <div key={user.email}>{user.email}</div>
      )}
      <button onClick={getUsers}>Load users</button>
      <h1>Пользователь авторизован {store.user.email}</h1>
      <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ АККАУНТ!!!!'}</h1>
      <button onClick={store.logout}>
        Выйти
      </button>
    </div>
  );
}
