const apiPath = '/api/v1';

const routes = {
  chatPagePath: () => '/',
  loginPagePath: () => '/login',
  channelsPath: () => [apiPath, 'channels'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  loginPath: () => [apiPath, 'login'].join('/'),
};

export default routes;
