import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
export const useSearch = () => useContext(SearchContext);
