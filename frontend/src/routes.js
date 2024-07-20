const apiPath = '/api/v1';

const routes = {
  chatPagePath: () => '/',
  loginPagePath: () => '/login',
  loginPath: () => [apiPath, 'login'].join('/'),
};

export default routes;
