import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { LoggerConfigs } from './logger-configs.interface';
import { LOGGER_CONFIGS } from './logger-configs.provider';
import { LoggerTheme } from './logger-theme';
import { LoggerService } from './logger.service';

const MOCK_LOGGER_CONFIGS: LoggerConfigs = {
  invalidCallAction: 'ignore',
  allowedLevels: {
    log: true,
    info: true,
    warn: true,
    error: true,
    user: true,
    server: true,
  },
};

@Injectable({
  providedIn: 'root',
})
class MockLoggerService extends LoggerService {
  constructor() {
    super();
  }
}

describe('LoggerService', () => {
  const testLogMessage = 'Test log message';

  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      teardown: { destroyAfterEach: false },
      providers: [
        { provide: LOGGER_CONFIGS, useValue: MOCK_LOGGER_CONFIGS },
        MockLoggerService,
      ],
    });
    service = TestBed.inject(MockLoggerService);
  });

  it('should log a message with log level', () => {
    spyOn(console, 'log');
    const logOptions = service.log(testLogMessage);
    logOptions.print();
    expect(console.log).toHaveBeenCalledWith(`%c${testLogMessage}`, undefined);
  });

  it('should log a message with info level', () => {
    spyOn(console, 'info');
    const logOptions = service.info(testLogMessage);
    logOptions.print();
    expect(console.info).toHaveBeenCalledWith(
      `%c${testLogMessage}`,
      LoggerTheme.info,
    );
  });

  it('should log a message with warn level', () => {
    spyOn(console, 'warn');
    const logOptions = service.warn(testLogMessage);
    logOptions.print();
    expect(console.warn).toHaveBeenCalledWith(
      `%c${testLogMessage}`,
      LoggerTheme.warn,
    );
  });

  it('should log a message with error level', () => {
    spyOn(console, 'error');
    const logOptions = service.error(testLogMessage);
    logOptions.print();
    expect(console.error).toHaveBeenCalledWith(
      `%c${testLogMessage}`,
      LoggerTheme.error,
    );
  });

  it('should log a message with user level', () => {
    spyOn(console, 'log');
    const logOptions = service.user(testLogMessage);
    logOptions.print();
    expect(console.log).toHaveBeenCalledWith(
      `%c${testLogMessage}`,
      LoggerTheme.user,
    );
  });

  it('should log a message with server level', () => {
    spyOn(console, 'log');
    const logOptions = service.server(testLogMessage);
    logOptions.print();
    expect(console.log).toHaveBeenCalledWith(
      `%c${testLogMessage}`,
      LoggerTheme.server,
    );
  });

  it('should log to console.debug if invalidCallAction is log', (done) => {
    service['configs'].invalidCallAction = 'log';
    service.log(testLogMessage);
    spyOn(console, 'debug');
    setTimeout(() => {
      expect(console.debug).toHaveBeenCalledWith(
        'You must call either .print() or .table() to log the message',
      );
      done();
    }, 0);
  });
});
