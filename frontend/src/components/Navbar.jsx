import React from 'react';
import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser, getIsAuthorization } from '../slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthorization = useSelector(getIsAuthorization);
  const { t } = useTranslation();

  const logOut = () => dispatch(logoutUser());

  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <BootstrapNavbar.Brand as={Link} to="/">{t('hexletChat')}</BootstrapNavbar.Brand>
        {isAuthorization && <Button onClick={logOut}>{t('logout')}</Button>}
      </div>
    </BootstrapNavbar>
  );
};

export default Navbar;
