import React from 'react';
import ReactDOM from 'react-dom/client';
// import { QueryClient } from 'react-query';
// import { QueryClientProvider } from 'react-query/types/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    {/* <QueryClientProvider client={queryClient}> */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    {/* </QueryClientProvider> */}
  </React.StrictMode>,
);
