import { createContext, useState } from "react";

export const DepartmentDataContext = createContext();

export const DepartmentDataProvider = ({ children }) => {
  const [allDepartments, setAllDepartments] = useState([]);

  return (
    <DepartmentDataContext.Provider
      value={{ allDepartments, setAllDepartments }}
    >
      {children}
    </DepartmentDataContext.Provider>
  );
};
