import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSortContext } from "../../context/SortContext"; // Importa el hook de contexto de clasificación

import SortIcon from '@mui/icons-material/Sort';


const Sort: React.FC = () => {
  const { updateSort } = useSortContext()!; // Utiliza el hook de contexto de clasificación
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectSortOption = (option: string) => {
    updateSort({ sortBy: option }); // Actualiza el contexto de clasificación con la opción seleccionada
    handleCloseMenu();
  };

  const customColors = {
    primary: {
      main: '#000',
      contrastText: '#000',
    },
    secondary: {
      main: '#fff',
      contrastText: '#fff',
    },
  };

  
  return (
    <div style={{ textAlign: 'center' }}>
      <button 
        onClick={handleOpenMenu}
        style={{ 
          backgroundColor: customColors.secondary.main,
          color: customColors.primary.main,
          padding: '8px 16px',
          border: `1px solid ${customColors.primary.main}`,
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          marginLeft: '8px',
        }}
      >
        Ordenar
        <SortIcon style={{ marginLeft: '4px' }} />
      </button>


      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleSelectSortOption("lowToHigh")}>
          Menor Precio
        </MenuItem>
        <MenuItem onClick={() => handleSelectSortOption("highToLow")}>
          Mayor Precio
        </MenuItem>
      
        <MenuItem onClick={() => handleSelectSortOption("newToOld")}>
          Nuevos a Viejos
        </MenuItem>
        <MenuItem onClick={() => handleSelectSortOption("oldToNew")}>
          Viejos a Nuevos
        </MenuItem>
        <MenuItem onClick={() => handleSelectSortOption("bestSellers")}>
          Más Vendidos
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Sort;
