import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShoppingContextProvider, ShoppingContext } from "../../Context";

import Home from "../Home";
import MyAccount from "../myAccount";
import MyOrder from "../myOrder";
import NotFound from "../NotFound";
import SingIn from "../singIn";
import MyOrders from "../myOrders";
import NavBar from "../../Components/NavBar";
import CheckOutSideMenu from "../../Components/CheckOutSideMenu";

import "./App.css";

const AppRoutes = () => {
   const context = useContext(ShoppingContext);

  return (
      <Routes>
        <Route path="/" element={<Home />} />

        {
          context.categories.map((category) => (
            <Route key={category.path}  path={category.path} element={<Home />} />
          ))
        }


        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/my-order" element={<MyOrder />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/sing-in" element={<SingIn />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-orders/last" element={<MyOrder />} />
        <Route path="/my-orders/:index" element={<MyOrder />} />
      </Routes>
  );
};

const App = () => {
  return (
    <ShoppingContextProvider>
      <BrowserRouter>
        <AppRoutes />
        <NavBar/>
        <CheckOutSideMenu />
      </BrowserRouter>
    </ShoppingContextProvider>
  );
};

export default App;
