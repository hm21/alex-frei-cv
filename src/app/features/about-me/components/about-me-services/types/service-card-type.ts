/**
 * Represents a service card.
 */
export type ServiceCard = {
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
};

/**
 * Represents the icon types for a service card.
 */
export type ServiceCardIcon = 'website' | 'app' | 'design' | 'backend';
