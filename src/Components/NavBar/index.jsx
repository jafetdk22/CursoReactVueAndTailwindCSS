import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import ShoppingContext from "../../Context";
import { ShoppingBagIcon, PlusIcon } from "@heroicons/react/24/solid";
import "./navbar.css";

const NavBar = () => {
  const context = useContext(ShoppingContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const activeStyle =
    "bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold";
  const inactiveStyle = "font-semibold hover:opacity-80 transition-opacity";

  const signOut = localStorage.getItem("sign-out");
  const parsedSignOut = JSON.parse(signOut);
  const isUserSignOut = context.signOut || parsedSignOut;

  const account = localStorage.getItem("account");
  const parsedAccount = JSON.parse(account);
  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const noAccountInLocalState = context.account
    ? Object.keys(context.account).length === 0
    : true;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  const handleSingOut = () => {
    const stringifiedSingOut = JSON.stringify(true);
    localStorage.setItem("sign-out", stringifiedSingOut);
    context.setSignOut(true);
  };
  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <li className="text-gray-400 mb-6">{parsedAccount?.email}</li>
          <li className="mb-3">
            <NavLink
              to="/my-orders"
              className={({ isActive }) =>
                isActive ? activeStyle : inactiveStyle
              }
            >
              My Orders
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/my-account"
              className={({ isActive }) =>
                isActive ? activeStyle : inactiveStyle
              }
            >
              My Account
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/sign-in"
              className={({ isActive }) =>
                isActive ? activeStyle : inactiveStyle
              }
              onClick={() => handleSingOut()}
            >
              Sign Out
            </NavLink>
          </li>
          {renderIcon()}
        </>
      );
    } else {
      return (
        <li className="mb-3">
          <NavLink
            to="/sign-in"
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
            onClick={() => handleSingOut()}
          >
            Sign In
          </NavLink>
        </li>
      );
    }
  };
  const renderIcon = () => (
    <>
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
    </>
  );
  const handleMenu = () => {
    if (!openMenu) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  };
  const handleSettings = () => {
    if (!openSettings) {
      setOpenSettings(true);
    } else {
      setOpenSettings(false);
    }
  };

  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full pt-1 px-10 text-sm font-light shadow-lg bg-white navbar">
      <div className="nav-brand p-3">
        <div className="flex">
          <button className="font-bold text-xl me-9">
            <NavLink
              to={`${isUserSignOut ? "/sign-in" : "/"}`}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity navbar-logo"
            >
              Shopi
            </NavLink>
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 IconBar"
            onClick={() => handleMenu()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>

        <ul
          className={`flex items-center gap-6 nav-ul ${openMenu ? "open" : ""}`}
        >
          <li>
            <NavLink
              to={hasUserAnAccount && !isUserSignOut ? "/" : "/sign-in"}
              onClick={() => {
                context.setSearchByCategory("");
                context.setSearch("");
              }}
              className={({ isActive }) =>
                isActive ? activeStyle : inactiveStyle
              }
            >
              All
            </NavLink>
          </li>
          {context.categories.map(({ path, label, category }) => (
            <li key={category}>
              <NavLink
                to={path}
                onClick={() => context.setSearchByCategory(category)}
                className={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="nav-menu">
        <ul 
        className={`flex items-center gap-6 ul-plus ${openSettings ? "open" : ""}`}
        >
          {renderView()}
          
        </ul>
        <div className="btn-plus">
          <button onClick={()=> handleSettings()}>
            <PlusIcon className="size-6 text-violet-500" />
          </button>
          {context?.cartProducts?.length > 0 && (
          <span className="absolute bottom-3 left-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full px-2">
            {context.cartProducts.length}
          </span>
        )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
