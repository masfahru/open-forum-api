/* eslint-disable no-unused-vars */
const Sentry = require('@sentry/node');
const { loggerConfig } = require('../../../configs/logger');
const sentry = require('../sentry');

jest.mock('@sentry/node', () => ({
  init: jest.fn(),
  captureException: jest.fn(),
}));

jest.mock('../../../configs/logger', () => ({
  loggerConfig: {
    dsn: 'dsn',
    env: 'development',
    sampleRate: 1,
  },
}));

describe('Sentry Unit test', () => {
  it('should be able to capture exception in development', () => {
    const spyInit = jest.spyOn(Sentry, 'init');
    const spyCapture = jest.spyOn(Sentry, 'captureException');

    const error = new Error('Test Error');

    sentry(error);

    expect(spyInit).toBeCalledWith({
      dsn: 'dsn',
      environment: 'development',
      sampleRate: 1,
    });
    expect(spyCapture).toBeCalledWith(error);
  });
});
