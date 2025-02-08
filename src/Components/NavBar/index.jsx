import { NavLink } from "react-router-dom";
import { useContext } from "react";
import ShoppingContext from "../../Context";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

const NavBar = () => {
  const context = useContext(ShoppingContext);

  const activeStyle = "bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold";
  const inactiveStyle = "font-semibold hover:opacity-80 transition-opacity";
  const renderIcon = () => (
    <li
      className="flex items-center gap-2 relative cursor-pointer"
      onClick={() =>
        context.isOpenCheckoutSideMenu
          ? context.closeCheckoutSideMenu()
          : context.openCheckoutSideMenu()
      }
    >
      <ShoppingBagIcon className="w-6 h-6 text-black" />
      {context?.cartProducts?.length > 0 && (
        <span className="absolute bottom-3 left-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full px-2">
          {context.cartProducts.length}
        </span>
      )}

    </li>
  );
  
  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-4 px-10 text-sm font-light shadow-lg bg-white">
      <ul className="flex items-center gap-6">
        <li className="font-bold text-xl">
          <NavLink to="/" className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            Shopi
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={() => {
              context.setSearchByCategory("");
              context.setSearch("");
            }}
            className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            All
          </NavLink>
        </li>
        {context.categories.map(({ path, label, category }) => (
        <li key={category}>
          <NavLink
            to={path}
            onClick={() => context.setSearchByCategory(category)}
            className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            {label}
          </NavLink>
        </li>
      ))}
      </ul>

      <ul className="flex items-center gap-6">
        <li className="text-gray-400">ing.jafet.sg@outlook.com</li>
        <li>
          <NavLink
            to="/my-orders"
            className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-account"
            className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sing-in"
            className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Sign In
          </NavLink>
        </li>
        {renderIcon()}
      </ul>
    </nav>
  );
};

export default NavBar;
