import { useState } from "react";

export const SearchBar = (props) => {
  const { handleSearch } = props;
  return (
    <input
      className="form-control me-1"
      type="search"
      placeholder="Search something..."
      aria-label="Search"
      onChange={(event) => {
        handleSearch(event.target.value);
      }}
    />
  );
};
