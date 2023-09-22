import { createContext, useReducer } from "react";
import NavbarReducer from "./NavbarReduder";
import { initialState } from "./NavbarReduder";

export const NavbarContext = createContext();

const NavbarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(NavbarReducer, initialState);

  return (
    <NavbarContext.Provider value={{ state, dispatch }}>
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarProvider;
