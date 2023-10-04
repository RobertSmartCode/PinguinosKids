import React from "react";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import Home from "../pages/home/Home";
import ItemDetail from "../components/pageComponents/itemDetail/ItemDetail";
import ItemListContainer from "../containers/itemlist/ItemListContainer";
import UserOrders from "../components/pageComponents/userOrders/UserOrders";
import Search from "../pages/search/Search";
interface Route {
  id: string;
  path: string;
  Element: React.ComponentType;
}

export const routes: Route[] = [
  {
    id: "home",
    path: "/",
    Element: Home,
  },
  {
    id: "shop",
    path: "/shop",
    Element: ItemListContainer,
  },
  {
    id: "detalle",
    path: "/itemDetail/:id",
    Element: ItemDetail,
  },
  {
    id: "cart",
    path: "/cart",
    Element: Cart,
  },
  {
    id: "checkout",
    path: "/checkout",
    Element: Checkout,
  },
  {
    id: "userOrders",
    path: "/user-orders",
    Element: UserOrders,
  },
  {
    id: "search",
    path: "/search",
    Element: Search,
  }
];
