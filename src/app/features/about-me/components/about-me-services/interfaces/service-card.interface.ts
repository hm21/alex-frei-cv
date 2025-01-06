import { ServiceCardIcon } from "../types/service-card-type";

/**
 * Represents a service card.
 */
export interface ServiceCard {
  /**
   * The title of the service card.
   */
  title: string;

  /**
   * The message of the service card.
   */
  msg: string;

  /**
   * The icon of the service card.
   */
  icon: ServiceCardIcon;
}
