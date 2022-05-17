const databaseErrorHandler = require('../databaseErrorHandler');
const DatabaseError = require('../../../../utils/errors/databaseError');

describe('Database Error Handler Test', () => {
  const mockRequest = {};
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const nextFunction = jest.fn();

  it('should return error message when Error is Database Error', async () => {
    const expectedResponse = {
      status: 'Database Error',
      message: 'Our Engineer is working on it. Please try again later.',
    };
    const res = mockResponse();
    databaseErrorHandler(new DatabaseError('Test Error'), mockRequest, res, nextFunction);

    expect(res.json).toBeCalledWith(expectedResponse);
    expect(res.status).toBeCalledWith(500);
  });

  it('should return pass the Error if it is a general Error', async () => {
    const err = new Error('Test Error');
    const res = mockResponse();
    databaseErrorHandler(err, mockRequest, res, nextFunction);

    expect(nextFunction).toBeCalledWith(err);
  });
});
