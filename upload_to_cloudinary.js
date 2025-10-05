process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'duuqhl0w9',
  api_key: '662125811114984',
  api_secret: '1xfJ9JTmgfsYqOyH1_b8dHZLdzA'
});

function uploadFolder(localFolder, cloudFolder) {
  const files = fs.readdirSync(localFolder);
  files.forEach(file => {
    const filePath = path.join(localFolder, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      uploadFolder(filePath, `${cloudFolder}/${file}`);
    } else {
      cloudinary.uploader.upload(filePath, {
        folder: cloudFolder,
        use_filename: true,
        unique_filename: false,
        overwrite: true
      }).then(res => console.log(res.secure_url))
        .catch(err => console.error(err));
    }
  });
}

// Example usage:
uploadFolder('./public/gallery', 'gallery');
uploadFolder('./public/images', 'images');