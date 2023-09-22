import ToastSuccess from "./ToastSuccess";
import ToastError from "./ToastError";
import ToastWarning from "./ToastWarning";
import { useContext, useEffect } from "react";
import { ToastContext } from "@/context/Toast/ToastContext";

export default function Toast() {
  const { toastState, hideToast } = useContext(ToastContext);
  const { message, type } = toastState;

  //   console.log("toastState", toastState);

  useEffect(() => {
    // console.log("----toastStatein", toastState);
    if (toastState.isVisible) {
      setTimeout(() => {
        // console.log("toastStateinhide", toastState);
        hideToast();
      }, toastState.duration || 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastState.isVisible]);

  if (!toastState.isVisible) {
    return null;
  }

  if (type === "success") {
    return <ToastSuccess message={message} />;
  } else if (type === "error") {
    return <ToastError message={message} />;
  } else if (type === "warning" || type === "info") {
    return <ToastWarning message={message} type={type} />;
  }
  return <ToastSuccess message={"No message provided"} type={type} />;
}
