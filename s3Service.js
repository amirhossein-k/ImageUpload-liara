const dotenv = require("dotenv");
dotenv.config();

const multer = require("multer");

const aws = require("aws-sdk");

const config = {
  endpoint: process.env.LIARA_ENDPOINT,
  accessKeyId: process.env.LIARA_ACCESS_KEY,
  secretAccessKey: process.env.LIARA_SECRET_KEY,
  region: process.env.REGION,
};

const BUCKET = process.env.LIARA_BUCKET_NAME;

const S3 = new aws.S3(config);

const s3Uploade = async (file) => {
  console.log(file, "file");
  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: `${Date.now().toString() + "| " + file.originalname}`,
    Body: file.buffer,
  };

  return await S3.upload(params).promise();
};

const s3UploadeMultiple = async (files) => {
  const params = files.map((file) => {
    return {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: `${Date.now().toString() + "| " + file.originalname}`,
      Body: file.buffer,
    };
  });
};

// delete multiple

const s3DeleteMultiple = async (files, key) => {
  const params = files.map((file, index) => {
    return {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: key[index],
    };
  });

  return await Promise.all(
    params.map((param) => S3.deleteObject(param).promise())
  );
};

// delete Single
const s3DeleteSingle = async (file, key) => {
  console.log(key);
  const param = {
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: key,
  };
  return await S3.deleteObject(param).promise();
};

module.exports = {
  s3Uploade,
  s3UploadeMultiple,
  s3DeleteMultiple,
  s3DeleteSingle,
};
