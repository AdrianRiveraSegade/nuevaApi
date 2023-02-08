const generateError = (message, status) => {
  const error = new Error(message);
  error.httpsStatus = status;
  return error;
};

module.exports = {
  generateError,
};
