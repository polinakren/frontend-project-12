import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
import Login from './components/Login';
import ChatPage from './components/ChatPage';
import store from './slices/index.js';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.loginPagePath()} element={<Login />} />
          <Route path={routes.chatPagePath()} element={<ChatPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </div>
);

export default App;
