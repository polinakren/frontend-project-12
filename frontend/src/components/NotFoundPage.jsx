import { useTranslation } from 'react-i18next';

import notFoundImage from '../assets/404.svg';
import routes from '../routes';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt="Страница не найдена" className="img-fluid h-25" src={notFoundImage} />
      <h1 className="h4 text-muted">{t('notFound.header')}</h1>
      <p className="text-muted">
        {t('notFound.message')}
        <a href={routes.chatPagePath()}>{t('notFound.linkText')}</a>
      </p>
    </div>
  );
};

export default NotFound;
