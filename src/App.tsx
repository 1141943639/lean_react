import React from 'react';

import BaseRoute from 'components/BaseRoute';
import { ROUTE_LIST } from 'routes';

function App() {
  return (
    <div className="bg-gray-100 md:p-5 h-screen">
      <React.Suspense fallback={<div>loading...</div>}>
        <BaseRoute routerArr={ROUTE_LIST} />
      </React.Suspense>
    </div>
  );
}

export default App;
