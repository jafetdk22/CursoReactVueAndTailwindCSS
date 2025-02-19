import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { ShoppingContextProvider, initializerLocalStorage, ShoppingContext } from "../../Context";

import Home from "../Home";
import MyAccount from "../myAccount";
import MyOrder from "../myOrder";
import NotFound from "../NotFound";
import SignIn from "../signIn";
import MyOrders from "../myOrders";
import NavBar from "../../Components/NavBar";
import CheckOutSideMenu from "../../Components/CheckOutSideMenu";

import "./App.css";

const AppRoutes = () => {
   const context = useContext(ShoppingContext);
   //Account 
   const account = localStorage.getItem('account')
   const parsedAccount = JSON.parse(account)
   //sign Out
   const signOut = localStorage.getItem('sign-out')
   const parsedSignOut = JSON.parse(signOut)
   //has an account
   const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
   const noAccountInLocalState = Object.keys(context.account).length === 0 
   const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState
   const isUserSignOut = context.signOut || parsedSignOut

  return (
      <Routes>
        <Route path="/" element={<Home />} />

        {
          context.categories.map((category) => (
            <Route key={category.path}  path={category.path} element={
              hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'}/>} />
          ))
        }


        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/my-order" element={<MyOrder />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-orders/last" element={<MyOrder />} />
        <Route path="/my-orders/:index" element={<MyOrder />} />
      </Routes>
  );
};

const App = () => {
  initializerLocalStorage()

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
