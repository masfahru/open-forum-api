const ClientError = require('../../../utils/errors/clientError');
const DomainErrorTranslator = require('../../../utils/errors/domainErrorTranslator');

const clientErrorHandler = (err, req, res, next) => {
  const translatedError = DomainErrorTranslator.translate(err);
  if (translatedError instanceof ClientError) {
    return res.status(translatedError.statusCode).json({
      status: 'fail',
      message: translatedError.message,
    });
  }
  return next(err);
};
module.exports = clientErrorHandler;
