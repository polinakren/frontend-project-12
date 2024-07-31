const apiPath = '/api/v1';

const routes = {
  chatPagePath: () => '/',
  loginPagePath: () => '/login',
  signupPagePath: () => '/signup',
  channelsPath: () => [apiPath, 'channels'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  loginPath: () => [apiPath, 'login'].join('/'),
};

export default routes;
