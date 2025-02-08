import { useContext } from "react";
import { ShoppingContext } from "../../Context";
import { PlusIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import "./card.css";
const Card = (data) => {
  const context = useContext(ShoppingContext);
  const showProductDetails = (product) => {
    context.openProductDetails();
    context.setProductToShow(product);
  };

  const addProductToCart = (event, product) => {
    event.stopPropagation();
    context.setCartProducts([...context.cartProducts, product]);
    context.setCount(context.count + 1);

    //context.openCheckoutSideMenu();
    context.closeProductDetails();
  };
  const renderIcon = (id) => {
    const isInCart =
      context.cartProducts.filter((product) => product.id === id).length > 0;
    if (isInCart) {
      return (
        <div className="absolute top-0 right-0 flex justify-center items-center bg-white rounded-full w-6 h-6 m-2 p-1">
          <ShieldCheckIcon className="w-6 h-6 text-black" />
        </div>
      );
    } else {
      return (
        <div
          className="absolute top-0 right-0 flex justify-center items-center bg-white rounded-full w-6 h-6 m-2 p-1"
          onClick={(event) => addProductToCart(event, data.data)}
        >
          <PlusIcon className="w-6 h-6 text-black" />
        </div>
      );
    }
  };
  return (
    <div
      className="cursor-pointer w-56 h-72 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
      onClick={() => showProductDetails(data.data)}
    >
      <figure className="relative mb-4 w-full h-4/5 rounded-lg overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-lg transform transition duration-300 hover:scale-110"
          src={data.data.images}
          alt={data.data.title}
        />
        {renderIcon(data.data.id)}
        <span className="absolute bottom-0 left-0 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs m-2 px-3 py-0.5 rounded-lg shadow-md">
          {data.data.category.name}
        </span>
      </figure>
      <p className="flex justify-between items-center mb-3 px-3">
        <span
          className="text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap tooltip"
          data-title={data.data.title}
        >
          {data.data.title}
        </span>
        <span className="text-lg font-semibold text-violet-500">
          ${data.data.price}
        </span>
      </p>
    </div>
  );
};

export default Card;
