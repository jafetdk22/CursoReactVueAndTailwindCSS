import { TrashIcon } from '@heroicons/react/24/solid'
const OrderCard = props => {
    const {id, title, imageUrl, price, handleDelete} = props;
  return (
    <div className="flex justify-between items-center mb-3 bg-white rounded-lg p-4 shadow-md">
      <div className='flex items-center gap-2'>
        <figure className='w-20 h-20'>
          <img className='w-full h-full object-cover rounded-lg' src={imageUrl} alt={title} />
        </figure>
        <p className='text-sm font-light'>{title}</p>
      </div>

      <div className='flex items-center gap-2'>
        <p className='bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold'>{price}$</p>
        {handleDelete && (
          <TrashIcon onClick={() => handleDelete(id)} className='w-6 h-6 text-gray-300 cursor-pointer hover:text-red-900' />
        )}
      </div>
    </div>
  );
};

export default OrderCard;
