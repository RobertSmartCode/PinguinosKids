import { useState } from 'react';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Lógica de búsqueda aquí
    console.log('Buscando:', searchTerm);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}

export default SearchBar;
