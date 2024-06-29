import { Injectable, inject } from '@angular/core';
import { LOGGER_CONFIGS } from './logger-configs.provider';
import { LoggerTheme } from './logger-theme';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private configs = inject(LOGGER_CONFIGS);

  /**
   * Logs a message with the 'log' level.
   * @param {any} msg - The message to log.
   */
  public log(msg: any) {
    return this.loggerOptions('log', msg);
  }

  /**
   * Logs a message with the 'info' level.
   * @param {any} msg - The message to log.
   */
  public info(msg: any) {
    return this.loggerOptions('info', msg);
  }

  /**
   * Logs a message with the 'warn' level.
   * @param {any} msg - The message to log.
   */
  public warn(msg: any) {
    return this.loggerOptions('warn', msg);
  }

  /**
   * Logs a message with the 'error' level.
   * @param {any} msg - The message to log.
   */
  public error(msg: any) {
    return this.loggerOptions('error', msg);
  }

  /**
   * Logs a message with the 'user' level.
   * @param {any} msg - The message to log.
   */
  public user(msg: any) {
    return this.loggerOptions('user', msg);
  }

  /**
   * Logs a message with the 'server' level.
   * @param {any} msg - The message to log.
   */
  public server(msg: any) {
    return this.loggerOptions('server', msg);
  }

  /**
   * Provides logger options with `print` and `table` methods.
   * @private
   * @param {LogLevel} level - The log level.
   * @param {any} msg - The message to log.
   */
  private loggerOptions(level: LogLevel, msg: any) {
    const loggerMethods = {
      print: this.logWith(level, msg),
      table: console.table.bind(console, msg),
    };

    if (this.configs.invalidCallAction === 'ignore') {
      return loggerMethods;
    } else {
      let checkCalled = false;

      // Define the proxy handler
      const handler = {
        get(target: any, prop: string) {
          if (prop === 'print' || prop === 'table') {
            checkCalled = true;
          }
          return Reflect.get(target, prop);
        },
      };

      // Create a proxy object to track method calls
      const proxy = new Proxy(loggerMethods, handler);

      // Check if neither method was called
      setTimeout(() => {
        if (!checkCalled) {
          const errorMsg =
            'You must call either .print() or .table() to log the message';
          if (this.configs.invalidCallAction === 'throw') {
            throw new Error(errorMsg);
          } else {
            console.debug(errorMsg);
          }
        }
      }, 0);

      return proxy;
    }
  }

  /**
   * Logs a message with the specified log level.
   * @private
   * @param {LogLevel} level - The log level.
   * @param {any} msg - The message to log.
   * @returns {(...args: any[]) => void} The console log function bound with the message and style.
   */
  private logWith(level: LogLevel, msg: any): (...args: any[]) => void {
    if (!this.configs.allowedLevels[level]) {
      return () => {};
    }

    /**
     * Logs a message to the console with the specified type and style.
     * @param {'log' | 'info' | 'warn' | 'error'} type - The console log type.
     * @param {any} msg - The message to log.
     * @param {string} [style] - The optional style to apply to the log message.
     */
    function consoleLog(
      type: 'log' | 'info' | 'warn' | 'error',
      msg: any,
      style?: string,
    ) {
      return console[type].bind(console, `%c${msg}`, style);
    }

    switch (level) {
      case 'log':
        return consoleLog('log', msg);
      case 'info':
        return consoleLog('info', msg, LoggerTheme.info);
      case 'warn':
        return consoleLog('warn', msg, LoggerTheme.warn);
      case 'error':
        return consoleLog('error', msg, LoggerTheme.error);
      case 'user':
        return consoleLog('log', msg, LoggerTheme.user);
      case 'server':
        return consoleLog('log', msg, LoggerTheme.server);
      default:
        return consoleLog('log', msg);
    }
  }
}

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'user' | 'server';
