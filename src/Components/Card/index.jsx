import { useContext } from "react";
import { ShoppingContext } from "../../Context";
import { PlusIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
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

    context.openCheckoutSideMenu();
    context.closeProductDetails();
  };
  const renderIcon = (id) => {
    const isInCart = context.cartProducts.filter(product => product.id === id).length > 0;
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
      className="bg-white cursor-pointer w-56 h-60 rounded-lg"
      onClick={() => showProductDetails(data.data)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">
          {data.data.category.name}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={data.data.images}
          alt={data.data.title}
        />
        {renderIcon(data.data.id)}
      </figure>
      <p className="flex justify-between items-center mb-2">
        <span className="text-sm font-light">{data.data.title}</span>
        <span className="text-lg font-medium">${data.data.price}</span>
      </p>
    </div>
  );
};

export default Card;
