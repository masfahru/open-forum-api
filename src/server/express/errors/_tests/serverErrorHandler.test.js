const serverErrorHandler = require('../serverErrorHandler');

describe('Server Unknown Error Handler Test', () => {
  const mockRequest = {};
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const nextFunction = jest.fn();

  it('should return error message when Error is Unknown Error', async () => {
    const expectedResponse = {
      status: 'Server Error',
      message: 'Our Engineer is working on it. Please try again later.',
    };
    const res = mockResponse();
    serverErrorHandler(new Error('Test Error'), mockRequest, res, nextFunction);

    expect(res.json).toBeCalledWith(expectedResponse);
    expect(res.status).toBeCalledWith(500);
  });
});
