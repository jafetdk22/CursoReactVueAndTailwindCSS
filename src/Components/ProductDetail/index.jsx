 import { XMarkIcon } from '@heroicons/react/24/solid'
 import { useContext } from 'react';
 import { ShoppingContext } from '../../Context';
 import './details.css';


 const ProductDetail = () => {
    const context = useContext(ShoppingContext);
    return (
        <aside className={`${context.isOpenProductDetails ? 'flex' : 'hidden'} product-detail flex flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>Details</h2>
                <div className='h-6 w-6 cursor-pointer'>
                    <XMarkIcon onClick={() => context.closeProductDetails()}  className='w-6 h-6 text-black-500' />
                </div>
            </div>

            <figure className='px-6'>
                <img 
                className='w-full h-full object-cover rounded-lg' 
                src={context.productToShow.images} 
                alt={context.productToShow.title} />

            </figure>
            <p className='flex flex-col gap-2 p-6'>
                <span className='font-medium text-2xl mb-2'>{context.productToShow.title}</span>
                <span className='font-medium text-md'>${context.productToShow.price}</span>
                <span className='font-light text-sm'>{context.productToShow.description}</span>
            </p>
        </aside>
    )
 }  

 export default ProductDetail;
