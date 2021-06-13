require('dotenv').config();

exports.cloudinaryConfig = function() {

    return config = {
        cloud_name: process.env.cloud_name,
        api_key: process.env.cloudinary_api_key,
        api_secret: process.env.cloudinary_api_secret
    }

}