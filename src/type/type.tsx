

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  unit_price: number;
  discount: number;
  stock: number;
  sizes: string[];
  colors: { color: string; sizes: string[]; quantities: number[] }[];
  sku: string;
  keywords: string[];
  salesCount: number;
  featured: boolean;
  images: string[];
  createdAt: string;
  elasticity: string; 
  thickness: string; 
  breathability: string;
  season: string; 
  material: string; 
  details: string; 
}

export interface CartItem extends Product {
  quantity: number;
  // Asegúrate de que la propiedad 'colors' sea la misma que en la interfaz 'Product'
  colors: {
    color: string;
    sizes: string[];
    quantities: number[];
  }[]; // Mismo tipo que en la interfaz 'Product'
}


  export interface ColorData {
    color: string;
    sizes: string[];
    quantities: number[];
  }


export  interface ProductsFormProps {
    handleClose: () => void;
    setIsChange: (value: boolean) => void;
    productSelected: Product | null;
    setProductSelected: (product: Product | null) => void;
    products: Product[];
    updateColors: (newColors: { color: string; sizes: string[]; quantities: number[] }[]) => void;
  }

