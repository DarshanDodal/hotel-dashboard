import React, { useState } from 'react';
import { HotelDBAPI } from '../../../server/links';
import Pool from '../../../views/auth/cognitoClient';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { createHotelRatings } from '../../../graphql/mutations';
import { listHotelRatingss } from '../../../graphql/queries';
var ratings = [];
const Ratings = HotelId => {
  API.graphql(
    graphqlOperation(listHotelRatingss, {
      filter: {
        HotelID: {
          eq: HotelId
        }
      }
    })
  )
    .then(data => {
      console.log(data.data.listHotelRatingss.items);
      const ratingData = data.data.listHotelRatingss.items;
      const length = ratingData.length;
      let sum = 0;
      ratingData.forEach((cv, index) => {
        sum = sum + cv.rating;
      });
      ratings.push({ votes: length, rating: sum / length });
      //   return ratings;
      //   setRatings({ votes: length, rating: sum / length });
      //   const orderss = rawOrders.data.listOrderss.items;
      //   setOrders(orderss);
      //   // console.log(orderss);
      //   dispatch({ type: 'SET_ORDERS', payload: orderss });
      //   setLoading(false);
      //   console.log(orders.length);
    })
    .catch(err => {
      console.log(err);
      //   setLoading(false);
      //   dispatch({ type: 'SET_MASTER_ERROR', payload: true });
    });
  return { ratings: ratings };
};
export default Ratings;
