import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'darshh',
  api_key: '414883371139432',
  api_secret: 'sIssfZNHKg0p2XXSfKwD2jZa8gQ'
});

const upload = location => {
  cloudinary.v2.uploader.upload(location, { public_id: 'image' }, function(
    error,
    result
  ) {
    console.log(result);
  });
};

export { upload };
