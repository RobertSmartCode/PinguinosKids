import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSortContext } from "../../context/SortContext"; // Importa el hook de contexto de clasificación

interface SortProps {
  // No necesitas la función applySort en este componente, ya que ahora utiliza el contexto
}

const Sort: React.FC<SortProps> = () => {
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

  return (
    <div style={{ textAlign: 'center' }}>
      <button   onClick={handleOpenMenu}>Ordenar</button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleSelectSortOption("lowToHigh")}>
          Precio: Bajo a Alto
        </MenuItem>
        <MenuItem onClick={() => handleSelectSortOption("highToLow")}>
          Precio: Alto a Bajo
        </MenuItem>
        <MenuItem onClick={() => handleSelectSortOption("aToZ")}>A-Z</MenuItem>
        <MenuItem onClick={() => handleSelectSortOption("zToA")}>Z-A</MenuItem>
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
