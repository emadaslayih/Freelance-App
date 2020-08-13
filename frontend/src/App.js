import React, { useEffect } from "react";
import Router from "./Router";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./redux/auth/thunks";
import setAuthToken from "./redux/utils/setAuthToken";

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
