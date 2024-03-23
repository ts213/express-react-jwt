import React, { useContext, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import { observer } from 'mobx-react-lite';
import { StoreContext } from './store/userStore';
import { UserTab } from './components/UserTab';

export default observer(function App() {
  const store = useContext(StoreContext);

  useEffect(() => {
    localStorage.getItem('token') && store.checkAuth();
  }, []);

  if (store.isLoading) {
    return <div>Загрузка...</div>
  }

  if (!store.isAuth) {
    return <LoginForm />
  }

  return <UserTab />
});
