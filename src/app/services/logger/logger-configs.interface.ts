/**
 * Configuration options for the Logger.
 */
export interface LoggerConfigs {
  /**
   * Defines the action to be taken when an invalid function call is made.
   *
   * 'throw' - Throws an error if neither `print` nor `table` is called.
   * 'log' - Logs an error message to the console if neither `print` nor `table` is called.
   * 'ignore' - Ignores the invalid call without any action.
   */
  invalidCallAction: 'throw' | 'log' | 'ignore';

  /**
   * Specifies which logging levels are allowed.
   */
  allowedLevels: {
    /**
     * Allow logging with the `log` level.
     */
    log: boolean;

    /**
     * Allow logging with the `info` level.
     */
    info: boolean;

    /**
     * Allow logging with the `warn` level.
     */
    warn: boolean;

    /**
     * Allow logging with the `error` level.
     */
    error: boolean;
    
    /**
     * Allow logging with the `user` level.
     */
    user: boolean;

    /**
     * Allow logging with the `server` level.
     */
    server: boolean;
  };
}
