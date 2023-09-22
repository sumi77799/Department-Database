import { createContext, useReducer } from "react";
import TableReducer from "./TableReduder";
import { initialState } from "./TableReduder";

export const TableContext = createContext();

const TableProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TableReducer, initialState);

  return (
    <TableContext.Provider value={{ state, dispatch }}>
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
