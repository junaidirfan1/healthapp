import { BrowserRouter } from 'react-router-dom';
import './assets/css/style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MainRouter from './router';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <MainRouter />
          <ToastContainer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
