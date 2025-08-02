import { ToastContextValue } from "@/types/Toast.types";
import { useContext } from "react";

export const useToast = <T extends ToastContextValue>(
  ReactContext: React.Context<T>
): ToastContextValue => {
  const context = useContext(ReactContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
