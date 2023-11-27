import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Lógica de búsqueda aquí
    console.log('Buscando:', searchTerm);
  };

  return (
    <Box className="search-bar" marginLeft="2px">
      <TextField
        type="text"
        label="¿Qué está buscando?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon onClick={handleSearch} style={{ cursor: 'pointer' }} />
            </InputAdornment>
          ),
        }}
        sx={{ width: '700px' }} // Ajusta el ancho según tus necesidades
      />
    </Box>
  );
}

export default SearchBar;
