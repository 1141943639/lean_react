import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GlobalLoading } from 'components/Loading';
import store, { persist } from 'store';

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <GlobalLoading>{props.children}</GlobalLoading>
      </PersistGate>
    </Provider>
  );
};

export default Layout;
