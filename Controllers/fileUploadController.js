const {
  s3Uploade,
  s3UploadeMultiple,
  s3DeleteMultiple,
  s3DeleteSingle,
} = require("../s3Service");

const singleFileUpload = async (req, res) => {
  try {
    const result = await s3Uploade(req.file);
    console.log(req.file, "req file");

    const file = {
      fileName: req.file.originalname,
      filePath: result.Location,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormater(req.file.size, 2),
      fileKey: result.Key,
    };

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const detailImage = {
      time: today.toDateString(),
      file: file,
    };

    res.status(201).json(detailImage);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteFileUpload = async (req, res) => {
  try {
    console.log(req.body);
    const resultdelete = await s3DeleteSingle("", req.body.Key);

    if (resultdelete) {
      res.status(200).json("success");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const multipleFileUpload = async (req, res, next) => {
  try {
    const result = await s3UploadeMultiple(req.files);

    // key
    let propLocation = [];
    let propKey = [];
    result.forEach((item, index) => {
      propLocation.push(item.Location);
      propKey.push(item.Key);
    });

    let fileArray = [];

    req.files.forEach((item, index) => {
      const file = {
        fileName: item.originalname,
        filePath: propLocation[index],
        fileType: item.mimetype,
        fileSize: fileSizeFormater(item.size, 2),
        fileKey: propKey[index],
      };
      fileArray.push(file);
    });

    const detailImage = {
      time: Date.now(),
      file: fileArray,
    };
    res.status(201).json(detailImage);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateMultipleFile = async (req, res, next) => {
  try {
    const resultdelete = await s3DeleteMultiple(req.files, req.body.key);
    const result = await s3UploadeMultiple(req.files);

    // key
    let proplocation = [];
    let propkey = [];
    result.forEach((item, index) => {
      proplocation.push(item.Location);
      propkey.push(item.key);
    });

    let filesArray = [];

    req.files.forEach((item, index) => {
      const file = {
        fileName: item.originalname,
        filePath: proplocation[index],
        fileType: item.mimetype,
        fileSize: fileSizeFormater(item.size, 2),
        fileKey: propkey[index],
      };
      filesArray.push(file);
    });

    const detailImage = {
      time: Date.now(),
      file: filesArray,
    };
    res.status(201).json(detailImage);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateSingleFile = async (req, res) => {
  try {
    const resultdelete = await s3DeleteSingle(req.file, req.body.key);
    const result = await s3Uploade(req.file);

    const file = {
      fileName: req.file.originalname,
      filePath: result.Location,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormater(req.file.size, 2),
      fileKey: result.Key,
    };

    const detailImage = {
      time: Date.now(),
      file: file,
    };

    res.status(201).json(detailImage);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// format size

const fileSizeFormater = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

module.exports = {
  singleFileUpload,
  multipleFileUpload,
  updateSingleFile,
  updateMultipleFile,
  deleteFileUpload,
};
