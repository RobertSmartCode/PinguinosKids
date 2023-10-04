import MenuButton from './MenuButton/MenuButton';
import Logo from './Logo/Logo';
import SearchBar from './SearchBar/SearchBar';
import LoginButton from './LoginButton/LoginButton';
import ShoppingCartIcon from './ShoppingCart/ShoppingCart';

function NavbarDesktop() {
  return (
    <header className="navbar-desktop">
      <MenuButton />
      <Logo />
      <SearchBar />
      <LoginButton />
      <ShoppingCartIcon />
    </header>
  );
}

export default NavbarDesktop;
