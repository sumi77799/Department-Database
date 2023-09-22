const initialState = {
  message: "",
  duration: 3000,
  isVisible: false,
  type: "success",
};

const ToastReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_TOAST":
      return {
        ...state,
        message: action.payload.message,
        duration: action.payload.duration,
        isVisible: true,
        type: action.payload.type,
      };
    case "HIDE_TOAST":
      return {
        ...state,
        isVisible: false,
      };
    default:
      throw new Error("Unexpected action type in ToastReducer.js");
  }
};

export default ToastReducer;
export { initialState };
