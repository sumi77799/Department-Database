import { createContext, useReducer } from "react";
import ToastReducer from "./ToastReducer";
import { initialState } from "./ToastReducer";

export const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toastState, toastDispatch] = useReducer(ToastReducer, initialState);

  const showToast = ({ message, duration, type }) => {
    duration = duration ?? 3000;
    type = type ?? "success";
    toastDispatch({
      type: "SHOW_TOAST",
      payload: {
        message,
        duration,
        type,
      },
    });
  };

  const hideToast = () => {
    toastDispatch({
      type: "HIDE_TOAST",
    });
  };

  return (
    <ToastContext.Provider value={{ toastState, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
