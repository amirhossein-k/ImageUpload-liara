const express = require("express");
const {
  singleFileUpload,
  multipleFileUpload,
  updateSingleFile,
  updateMultipleFile,
} = require("../Controllers/fileUploadController");

const router = express.Router();
const {upload} = require("../helper/filehelper");
router.route("/singleFile").post(upload.single("file"), singleFileUpload);
router.route("/multipleFile").post(upload.array("files"), multipleFileUpload);
router
  .route("/updateMultipleFile")
  .put(upload.array("files"), updateMultipleFile);
router.route("/updateSingleFile").put(upload.single("file"), updateSingleFile);

module.exports = router;
