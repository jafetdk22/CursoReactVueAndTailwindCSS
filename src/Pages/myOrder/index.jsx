import Layout from "../../Components/Layout";
import { ShoppingContext } from "../../Context";
import { useContext } from "react";
import OrderCard from "../../Components/OrderCard";

import { Link } from "react-router-dom";
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
const MyOrder = () => {
    const context = useContext(ShoppingContext);
    const currentPath = window.location.pathname;
    let orderIndex = currentPath.substring(currentPath.lastIndexOf('/')+1);
    
    // Si el índice es 'last', obtener el último índice del array
    if (orderIndex === 'last')  orderIndex = context.order?.length - 1 || 0;
    
    
    const order = context.order?.[orderIndex];
  return (
    <Layout>
      <div className='flex flex-col w-80'>
        <div className='relative flex w-full items-center justify-center mb-6'>
            <Link to='/my-orders' className='absolute left-0'>
                <ChevronLeftIcon className='w-6 h-6 text-black cursor-pointer hover:text-gray-500 transition-colors'/>
            </Link>
            <h1 className='text-2xl font-bold'>My Orders</h1>
        </div>
        
        <div className="flex flex-col gap-4 w-full">
          {
            order?.products?.map(product => (
              <OrderCard      
                id={product.id}       
                key={product.id}
                title={product.title}
                imageUrl={product.images}
                price={product.price}
                className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
              />
            ))
          }
        </div>
      </div>
    </Layout>
  );
};

export default MyOrder;
