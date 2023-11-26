import MenuButton from './MenuButton/MenuButton';
import Logo from './Logo/Logo';
import SearchBar from './SearchBar/SearchBar';
import LoginButton from './LoginButton/LoginButton';
import ShoppingCartIcon from './ShoppingCart/ShoppingCart';
import PromotionBar from './PromotionBar/PromotionBar';
import MobileCart from '../NavbarMobile/MobileCart/MobileCart';
import { useState } from 'react';

function NavbarDesktop() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  
  return (
    <header className="navbar-desktop">
      <PromotionBar/>
      <Logo />
      <SearchBar />
      <MenuButton />
      <LoginButton />
      <MobileCart  onClick={handleCartClick} />
      <ShoppingCartIcon />
    </header>
  );
}

export default NavbarDesktop;
