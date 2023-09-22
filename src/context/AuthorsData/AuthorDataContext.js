import { createContext, useState } from "react";

export const AuthorDataContext = createContext();

export const AuthorDataProvider = ({ children }) => {
  const [allAuthors, setAllAuthors] = useState([]);

  return (
    <AuthorDataContext.Provider value={{ allAuthors, setAllAuthors }}>
      {children}
    </AuthorDataContext.Provider>
  );
};
