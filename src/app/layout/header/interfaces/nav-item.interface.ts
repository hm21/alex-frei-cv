import { NavItemId } from "../types/nav-item-id.type";

/**
 * Interface representing a navigation item.
 * @interface
 */
export interface NavItem {
  path: string;
  name: string;
  msg: string;
  id: NavItemId;
  icon?: any;
}
