import React, { useState, useContext } from 'react';
import getProfile from '../../../server/getProfile';

const GetHotelProfile = ({}) => {
  const [value, setValue] = useState('');
  getProfile().then(profile => {
    if (Object.keys(profile.data).length === 0) {
      return;
    }
    console.log(profile.data);
    values.hotelName = profile.data.Item.hotelName || '';
    values.owner = profile.data.Item.owner || '';
    values.address = profile.data.Item.address || '';
    values.phone = profile.data.Item.phone || '';
    values.city = profile.data.Item.city || '';
    values.state = profile.data.Item.state || '';
    values.country = profile.data.Item.country || '';
    values.pincode = profile.data.Item.pincode || '';
    values.licenseNumber = profile.data.Item.licenseNumber || '';
    values.licenseDoc = profile.data.Item.licenseDoc || '';
    values.guestCapacity = profile.data.Item.guestCapacity || '';
  });
};
