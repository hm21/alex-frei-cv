import { ToastType } from "../types/toast-types";

export interface ToastConfig {
  id: string | number;
  message: string;
  title?: string;
  type?: ToastType;
  spinner?: boolean;
  tap?: any;
}
