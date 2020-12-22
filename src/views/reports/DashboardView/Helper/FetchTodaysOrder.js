import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { OrdersAPI } from '../../../../server/links';

export const FetchOrder = cb => {
  let orders = 0;
  let total = 0;
  let tables = [];
  Auth.currentUserInfo().then(user => {
    // console.log("Email", e);
    // console.log(user);
    fetch(
      OrdersAPI +
        '/api/get-all-orders-by-hotel-ts' +
        `?hotel=${user.username}&active=true`
    )
      .then(response => response.json())
      .then(data => {
        // console.log(data.data);
        if (data.data.length === 0) {
          return cb(0, 0);
        }
        data.data.forEach(item => {
          orders++;
          if (!tables.includes(item.tableNumber)) {
            tables.push(item.tableNumber);
          }
          item.dishes.forEach(dish => {
            const eachAmount = dish.quantity * dish.amount;
            total = total + eachAmount;

            // console.log(orders);
          });
        });
        return cb(orders, total, data.data, tables.length);
      })
      .catch(error => {
        console.log(error);
        // setLoading(false);
      });
  });
};

export const FetchTable = cb => {
  let tables = [];
  Auth.currentUserInfo().then(user => {
    // console.log("Email", e);
    // console.log(user);
    fetch(
      OrdersAPI +
        '/api/get-all-active-orders-by-hotel-ts' +
        `?hotel=${user.username}&active=true`
    )
      .then(response => response.json())
      .then(data => {
        // console.log(data.data);
        if (data.data.length === 0) {
          return cb(0);
        }
        data.data.forEach(item => {
          if (!tables.includes(item.tableNumber)) {
            tables.push(item.tableNumber);
          }
        });
        return cb(tables.length);
      })
      .catch(error => {
        console.log(error);
        // setLoading(false);
      });
  });
};
