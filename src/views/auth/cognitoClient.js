import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-south-1_kFeJPT6om',
  ClientId: '4cf70uk4jj50ubm77cck32ag8f'
};

export default new CognitoUserPool(poolData);
