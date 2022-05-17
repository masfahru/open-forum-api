const clientErrorHandler = require('../clientErrorHandler');
const InvariantError = require('../../../../utils/errors/invariantError');

describe('Client Error Handler Test', () => {
  const mockRequest = {};
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const nextFunction = jest.fn();

  it('should return error message when Error is one of Client Error', async () => {
    const expectedResponse = {
      status: 'fail',
      message: 'Test Error',
    };
    const res = mockResponse();
    clientErrorHandler(new InvariantError('Test Error'), mockRequest, res, nextFunction);

    expect(res.json).toBeCalledWith(expectedResponse);
    expect(res.status).toBeCalledWith(400);
  });

  it('should return pass the Error if it is a general Error', async () => {
    const err = new Error('Test Error');
    const res = mockResponse();
    clientErrorHandler(err, mockRequest, res, nextFunction);

    expect(nextFunction).toBeCalledWith(err);
  });
});
