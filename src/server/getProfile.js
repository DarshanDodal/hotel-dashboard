import { HotelDBAPI } from './links.js';
import Pool from '../views/auth/cognitoClient';
import rp from 'request-promise';

const getProfile = () => {
  var options = {
    uri: HotelDBAPI + `/get-one?username=${Pool.getCurrentUser().username}`,
    headers: {
      'User-Agent': 'Request-Promise',
      'Access-Control-Allow-Origin': '*'
    },
    json: true // Automatically parses the JSON string in the response
  };
  rp(options)
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export default getProfile;
