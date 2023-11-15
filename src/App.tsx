import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import CartContextComponent from "./context/CartContext";
import AuthContextComponent from "./context/AuthContext";
import FilterContextComponent from "./context/FilterContext";
import SortContextComponent from "./context/SortContext";
import SearchContextComponent from "./context/SearchContext";


function App() {

  return (
 
  <BrowserRouter>
  <SearchContextComponent>
  <SortContextComponent>
  <FilterContextComponent>
    <CartContextComponent>
      <AuthContextComponent>
        
        <AppRouter />
      </AuthContextComponent>
    </CartContextComponent>
  </FilterContextComponent>
  </SortContextComponent>
  </SearchContextComponent>
  </BrowserRouter>



  );
}

export default App;
