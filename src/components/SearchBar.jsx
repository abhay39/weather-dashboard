import React, { useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      onSearch(city);
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a city"
          variant="outlined"
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleSearch}
        />
      )}
    />
  );
};

export default SearchBar;
