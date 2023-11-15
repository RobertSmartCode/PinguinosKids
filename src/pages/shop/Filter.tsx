import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFilterContext } from "../../context/FilterContext";

const Filter: React.FC = () => {

    // Lista de colores y tallas
    const colorOptions = ["Azul", "Rojo", "Fuccia", "Nude"];
    const sizeOptions = ["10", "12", "14", "16", "18"];
    
    const { filter, updateFilter } = useFilterContext()!;
    const [colors, setColors] = useState<{ [key: string]: boolean }>(() => {
      const initialColors: { [key: string]: boolean } = {};
      colorOptions.forEach(color => {
        initialColors[color] = filter.colors[color] ?? false;
      });
      return initialColors;
    });
    const [sizes, setSizes] = useState<{ [key: string]: boolean }>(() => {
      const initialSizes: { [key: string]: boolean } = {};
      sizeOptions.forEach(size => {
        initialSizes[size] = filter.sizes[size] ?? false;
      });
      return initialSizes;
    });
    const [priceRange, setPriceRange] = useState({
      from: filter.priceRange.from,
      to: filter.priceRange.to,
    });
  
    useEffect(() => {
      setColors((prevColors) => ({
        ...prevColors,
        ...filter.colors,
      }));
      setSizes((prevSizes) => ({
        ...prevSizes,
        ...filter.sizes,
      }));
      setPriceRange({
        from: filter.priceRange.from,
        to: filter.priceRange.to,
      });
    }, [filter.colors, filter.sizes, filter.priceRange]);
  
    const handleColorChange = (color: string) => {
      updateFilter({ colors: { ...colors, [color]: !colors[color] } });
    };
  
    const handleSizeChange = (size: string) => {
      updateFilter({ sizes: { ...sizes, [size]: !sizes[size] } });
    };
  
    const handlePriceChange = (field: string, value: string) => {
      updateFilter({ priceRange: { ...priceRange, [field]: value } });
    };
  
  
    const handleApplyFilters = () => {
      console.log("Rango de precio:", priceRange);
    };


  return (
    <div>
      <h4>Colores</h4>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {colorOptions.map((color) => (
          <label key={color} style={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={colors[color]}
              onChange={() => handleColorChange(color)}
            />
            {color}
          </label>
        ))}
      </div>
      <div>
        <h4>Tallas</h4>
        {sizeOptions.map((size) => (
          <div key={size}>
            <label>
              <Checkbox
                checked={sizes[size]}
                onChange={() => handleSizeChange(size)}
              />
              {size}
            </label>
          </div>
        ))}
      </div>
      <div>
        <h4>Rango de Precio</h4>
        <TextField
          label="Desde"
          variant="outlined"
          value={priceRange.from}
          onChange={(e) => handlePriceChange("from", e.target.value)}
        />
        <TextField
          label="Hasta"
          variant="outlined"
          value={priceRange.to}
          onChange={(e) => handlePriceChange("to", e.target.value)}
        />
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={handleApplyFilters}>
          Aplicar Rangos
        </Button>
      </div>
    </div>
  );
};

export default Filter;
