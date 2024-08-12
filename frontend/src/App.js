import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
import Login from './components/Login';
import ChatPage from './components/ChatPage';
import SignUpPage from './components/SignUpPage';
import Navbar from './components/Navbar';

const App = () => (
  <div className="d-flex flex-column h-100">
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={routes.signupPagePath()} element={<SignUpPage />} />
        <Route path={routes.loginPagePath()} element={<Login />} />
        <Route path={routes.chatPagePath()} element={<ChatPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </div>
);

export default App;
