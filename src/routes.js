import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import CreditCard from "examples/Icons/CreditCard";
import { FaBox, FaTags, FaUsers, FaImages, FaShoppingCart } from 'react-icons/fa';

import Products from "layouts/product";
import Categories from "layouts/category";
import Users from "layouts/user";
import CarouselImages from "layouts/carousel_images";

import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";

import FrontendHome from "layouts/frontendHome";
import Orders from "layouts/orders";

const token = localStorage.getItem("token");

const routes = [
  // Frontend Routes
  {
    type: "route",
    name: "Frontend Home",
    key: "frontend-home",
    route: "/home",
    component: <FrontendHome />,
  },

  // Admin Routes
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/admin/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/admin/tables",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/admin/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Products",
    key: "products",
    route: "/admin/products",
    icon: <FaBox size="12px" />,
    component: <Products />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Categories",
    key: "categories",
    route: "/admin/categories",
    icon: <FaTags size="12px" />,
    component: <Categories />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Orders",
    key: "orders",
    route: "/admin/orders",
    icon: <FaShoppingCart size="12px" />,
    component: <Orders />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    route: "/admin/users",
    icon: <FaUsers size="12px" />,
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Carousel Images",
    key: "carousel-images",
    route: "/admin/carousel_images",
    icon: <FaImages size="12px" />,
    component: <CarouselImages />,
  },
  
  // Authentication Routes
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <SpaceShip size="12px" />,
  //   component: <SignUp />,
  //   noCollapse: true,
  // },
];

if (token) {
  routes.splice(routes.findIndex(route => route.key === "sign-in"), 1);
}

export default routes;

