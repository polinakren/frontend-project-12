import Rollbar from 'rollbar';

const rollbarConfig = {
  accessToken: '0f1b403bc65442cea0e3acce75bda7c8',
  environment: 'development',
};

const rollbar = new Rollbar(rollbarConfig);

export default rollbar;
