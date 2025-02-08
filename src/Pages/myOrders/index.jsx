import { useContext } from "react";
import { ShoppingContext } from '../../Context'
import Layout from '../../Components/Layout'
import OrdersCard from '../../Components/OrdersCard'
import { Link } from "react-router-dom";

const MyOrders = () => {
    const context = useContext(ShoppingContext);
    return (
      <Layout>
            <h1 className='text-2xl font-bold'>My Orders</h1>

          {context.order?.map((order, index) => (
            <Link key={index} to={`/my-orders/${index}`}>
                <OrdersCard
                    totalPrice={order.totalPrice}
                    totalProducts={order.totalProducts}
                />
            </Link>
          ))}

      </Layout>
    )
  }
  
  export default MyOrders