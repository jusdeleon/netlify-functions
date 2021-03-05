module.exports = (body, statusCode) => {
  return {
    statusCode,
    body: JSON.stringify(body)
  };
};