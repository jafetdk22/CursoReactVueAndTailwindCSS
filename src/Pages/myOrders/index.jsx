import { useContext } from "react";
import { ShoppingContext } from "../../Context";
import Layout from "../../Components/Layout";
import OrdersCard from "../../Components/OrdersCard";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const context = useContext(ShoppingContext);
  const renderOrders = () => {
    if (context.order.length === 0) {
      return (
        <div className="grid w-full max-w-screen-lg">
          <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              No orders found
            </h1>

            <p className="text-lg bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold mt-2 text-center">
              You have not made any orders yet. Please make an order to see your
              orders.
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-lg mx-auto">
          {context.order?.map((order, index) => (
            <Link key={index} to={`/my-orders/${index}`}>
              <OrdersCard
                totalPrice={order.totalPrice}
                totalProducts={order.totalProducts}
              />
            </Link>
          ))}
        </div>
      );
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {renderOrders()}
    </Layout>
  );
};

export default MyOrders;
