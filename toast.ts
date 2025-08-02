import { toastState } from "@/state/toast";
import { ToastT } from "@/types/Toast.types";

const DEFAULT_DURATION = 4000;

function createToast(
  type: ToastT["type"],
  message: string,
  data?: Partial<ToastT>
) {
  return toastState.create({
    title: message,
    type,
    duration: DEFAULT_DURATION,
    dismissible: true,
    position: "bottom-right",
    ...data,
  });
}

export const toast = {
  success: (message: string, data?: Partial<ToastT>) =>
    createToast("success", message, data),
  error: (message: string, data?: Partial<ToastT>) =>
    createToast("error", message, data),
  warning: (message: string, data?: Partial<ToastT>) =>
    createToast("warning", message, data),
  info: (message: string, data?: Partial<ToastT>) =>
    createToast("info", message, data),
  loading: (message: string, data?: Partial<ToastT>) =>
    createToast("loading", message, data),
  custom: (message: string, data?: Partial<ToastT>) =>
    createToast(undefined, message, data),
  dismiss: (id: string) => toastState.dismiss(id),
  clear: () => toastState.clear(),
};
