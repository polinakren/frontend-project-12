import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
import Login from './components/Login';
import ChatPage from './components/ChatPage';
import store from './slices/index.js';
import SignUpPage from './components/SignUpPage';
import './i18Init';
import Navbar from './components/Navbar';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={routes.signupPagePath()} element={<SignUpPage />} />
          <Route path={routes.loginPagePath()} element={<Login />} />
          <Route path={routes.chatPagePath()} element={<ChatPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </div>
);

export default App;
