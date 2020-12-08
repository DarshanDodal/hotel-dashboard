import { TableDB } from './links.js';
import Pool from '../views/auth/cognitoClient';
import rp from 'request-promise';

const getTables = async () => {
  //let res = '';
  // var options = {
  //   uri: HotelDBAPI + `/get-one?username=${Pool.getCurrentUser().username}`,
  //   json: true // Automatically parses the JSON string in the response
  // };
  // const res = rp(options)
  //   .then(data => {
  //     console.log('Success:', data);
  //     return data;
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });
  // console.log(res._settledValue());
  // return res;

  return new Promise((resolve, reject) => {
    fetch(TableDB + `/get-by-hotel/${Pool.getCurrentUser().username}`)
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
  // console.log(profile);
  // return profile;
};

const getTableById = async tableId => {
  //let res = '';
  // var options = {
  //   uri: HotelDBAPI + `/get-one?username=${Pool.getCurrentUser().username}`,
  //   json: true // Automatically parses the JSON string in the response
  // };
  // const res = rp(options)
  //   .then(data => {
  //     console.log('Success:', data);
  //     return data;
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });
  // console.log(res._settledValue());
  // return res;

  return new Promise((resolve, reject) => {
    fetch(TableDB + `/get-one/${tableId}`)
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
  // console.log(profile);
  // return profile;
};

export { getTables, getTableById, TableDB };
