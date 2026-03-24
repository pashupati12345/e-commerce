const getUploadedFilePath = (req, folderName = "", fallback = "") => {
  if (!req.file) {
    return fallback || "";
  }

  return `/uploads/${folderName}/${req.file.filename}`;
};

const buildFileUrl = (req, filePath) => {
  if (!filePath) {
    return null;
  }

  return `${req.protocol}://${req.get("host")}${filePath}`;
};

const attachFileUrl = (req, data, pathKey = "image", urlKey = "imageUrl") => {
  if (!data) {
    return data;
  }

  return {
    ...data,
    [urlKey]: buildFileUrl(req, data[pathKey]),
  };
};

const attachFileUrlsToList = (
  req,
  list = [],
  pathKey = "image",
  urlKey = "imageUrl"
) => {
  return list.map((item) => attachFileUrl(req, item, pathKey, urlKey));
};

module.exports = {
  getUploadedFilePath,
  buildFileUrl,
  attachFileUrl,
  attachFileUrlsToList,
};