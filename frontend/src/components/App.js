import {
  BrowserRouter, Navigate, Route, Routes, Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

import routes from '../routes';
import NotFoundPage from './NotFoundPage';
import Login from './Login';
import ChatPage from './ChatPage';
import SignUpPage from './SignUpPage';
import Navbar from './Navbar';

const PrivateOutlet = () => {
  const auth = useSelector((state) => state.auth);
  return auth.token ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={routes.signupPagePath()} element={<SignUpPage />} />
        <Route path={routes.loginPagePath()} element={<Login />} />
        <Route path={routes.chatPagePath()} element={<PrivateOutlet />}>
          <Route path="" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </div>
);

export default App;
