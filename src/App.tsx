import React, { useReducer } from 'react';
import './App.css';
import { AppRouter } from './router/AppRouter';
import { AuthContext } from './pages/contexts/GlobalState';
import { authReducer } from './pages/store/reducers/AuthReducer';

const init = () => {
  let sessionUser: any = sessionStorage.getItem("user");
  let user: any;
  if (!sessionUser) {
    user = sessionUser;
  } else {
    user = JSON.parse(sessionUser);
  }
  return user;
};


function App() {
  const [user, dispatchUser] = useReducer(authReducer, {}, init);
  return (
    <AuthContext.Provider value={{ user, dispatchUser }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
