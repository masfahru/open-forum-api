// eslint-disable-next-line no-unused-vars
const serverErrorHandler = (err, req, res, next) => {
  // we could change this console log with anoter logging system
  console.log(err);
  res.status(500).json({
    status: 'Server Error',
    message: 'Our Engineer is working on it. Please try again later.',
  });
};
module.exports = serverErrorHandler;
