import { NavLink } from "react-router-dom";
import { useContext } from "react";
import ShoppingContext from "../../Context";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

const NavBar = () => {
  const context = useContext(ShoppingContext);

  const activeStyle =
    "bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold";
  const inactiveStyle = "font-semibold hover:opacity-80 transition-opacity";

  const signOut = localStorage.getItem("sign-out");
  const parsedSignOut = JSON.parse(signOut);
  const isUserSignOut = context.signOut || parsedSignOut;

  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

  const handleSingOut = () => {
    const stringifiedSingOut = JSON.stringify(true);
    localStorage.setItem("sign-out", stringifiedSingOut);
    context.setSignOut(true);
  };
  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <li className="text-gray-400">
            {parsedAccount?.email}
            </li>
          <li>
            <NavLink
              to="/my-orders"
              className={({ isActive }) =>
                isActive ? activeStyle : inactiveStyle
              }
            >
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account"
              className={({ isActive }) =>
                isActive ? activeStyle : inactiveStyle
              }
            >
              My Account
            </NavLink>
          </li>
          <li>
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
        </>
      );
    } else {
      return (
        <li>
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

  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-4 px-10 text-sm font-light shadow-lg bg-white">
      <ul className="flex items-center gap-6">
        <li className="font-bold text-xl">
          <NavLink
            to={`${isUserSignOut ? '/sign-in' : '/'}`}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Shopi
          </NavLink>
        </li>
        <li>
          <NavLink
            to={hasUserAnAccount && !isUserSignOut ? '/' : '/sign-in'}
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

      <ul className="flex items-center gap-6">
        {renderView()}
        {renderIcon()}
      </ul>
    </nav>
  );
};

export default NavBar;
