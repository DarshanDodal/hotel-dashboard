const myAppConfig = {
  // ...
  aws_appsync_graphqlEndpoint:
    'https://qv4xgwj2yracrgzw3rw43kwfoa.appsync-api.ap-south-1.amazonaws.com/graphql',
  aws_appsync_region: 'ap-south-1',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS', // You have configured Auth with Amazon Cognito User Pool ID and Web Client Id
  aws_appsync_apiKey: 'da2-fakeApiId123456'
  // ...
};

export { myAppConfig };
