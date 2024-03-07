/**
 * Represents the environment configuration.
 */
export interface Environment {
  /**
   * Indicates whether the application is in production mode.
   */
  production: boolean;

  /**
   * Indicates whether analytics is enabled.
   */
  analytics: boolean;

  /**
   * Contains the endpoints for various features.
   */
  endpoints: {
    /**
     * The endpoint for the quiz feature.
     */
    quiz: string;

    /**
     * The endpoint for sending contact messages.
     */
    contactMessage: string;

    /**
     * The endpoint for the git commit count.
     */
    gitCommitCount: string;
  };
}
