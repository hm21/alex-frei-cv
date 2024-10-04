import { ToastType } from './toast-types';

export interface ToastI {
  id: string | number;
  message: string;
  title?: string;
  type?: ToastType;
  spinner?: boolean;
  tap?: any;
}
