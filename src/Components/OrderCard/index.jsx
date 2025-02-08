import { XMarkIcon } from '@heroicons/react/24/solid'
const OrderCard = props => {
    const {id, title, imageUrl, price, handleDelete} = props;
  return (
    <div className="flex justify-between items-center mb-3">
      <div className='flex items-center gap-2'>

        <figure className='w-20 h-20'>
          <img className='w-full h-full object-cover rounded-lg' src={imageUrl} alt={title} />
        </figure>
        <p className='text-sm font-light'>{title}</p>
      </div>

      <div className='flex items-center gap-2'>
        <p className='text-lg font-medium'>{price}</p>
        {handleDelete && (
          <XMarkIcon onClick={() => handleDelete(id)} className='w-6 h-6 text-black-500 cursor-pointer' />
        )}
      </div>
    </div>


  );
};

export default OrderCard;
