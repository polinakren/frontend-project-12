import { BrowserRouter, Route, Routes } from 'react-router-dom';

import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
import Login from './components/Login';

const App = () => (
  <div className="d-flex flex-column h-100">
    <BrowserRouter>
      <Routes>
        <Route path={routes.loginPagePath()} element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
