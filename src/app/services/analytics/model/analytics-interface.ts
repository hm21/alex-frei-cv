import { AnalyticsLogType } from './analytics-enum';

/**
 * Configuration interface for analytics events.
 */
export interface AnalyticsConfigs {
  /** Type of analytics log. */
  logType: AnalyticsLogType;
  /** Name of the event. */
  eventName?: string;
}
