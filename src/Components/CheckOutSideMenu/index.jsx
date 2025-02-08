import { useContext } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingContext } from "../../Context";
import OrderCard from "../OrderCard";
import { totalPrice } from "../Utils";
import "./styles.css";

const CheckOutSideMenu = () => {
  const context = useContext(ShoppingContext);
  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id !== id
    );

    context.setCartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    const orderToAdd = {
      date: "01.02.23",
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts),
    };

    context.setOrder([...context.order, orderToAdd]);
    context.setCartProducts([]);
    context.closeCheckoutSideMenu();
    context.setSearch('')
    context.setSearchByCategory('')
  };


  return (
    <aside
      className={`${
        context.isOpenCheckoutSideMenu ? "flex" : "hidden"
      } checkout-side-menu flex flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <div className="h-6 w-6 cursor-pointer">
          <XMarkIcon
            onClick={() => context.closeCheckoutSideMenu()}
            className="w-6 h-6 text-black-500"
          />
        </div>
      </div>
      <div className="px-6 overflow-y-scroll flex-1">
        {context.cartProducts?.length > 0 ? (
          context.cartProducts.map((product) => (
            <OrderCard
              id={product.id}
              key={product.id}
              title={product.title}
              imageUrl={product.images}
              price={product.price}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-center p-4">No hay productos en el carrito</p>
        )}
      </div>
      <div className="px-6 mb-6">
        <p className="flex justify-between items-center mb-3">
          <span className=" font-light">Total:</span>
          <span className="text-lg font-medium">
            ${totalPrice(context.cartProducts)}
          </span>
        </p>
        <Link to="/my-orders/last">
          <button
            className="bg-black text-white w-full rounded-lg py-3 cursor-pointer"
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default CheckOutSideMenu;
