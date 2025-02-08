import { CalendarDaysIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

const OrdersCard = props => {
    const {totalPrice, totalProducts} = props;
  return (
    <div className="group flex justify-between items-center mb-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center gap-6">
            <div className="flex items-center justify-center w-12 h-12 bg-violet-50 rounded-full group-hover:bg-violet-100 transition-colors">
                <ShoppingBagIcon className="w-6 h-6 text-violet-600" />
            </div>
            
            <div className="flex flex-col">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>01.02.23</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">{totalProducts}</span>
                    <span className="text-gray-500">articles</span>
                </div>
            </div>
        </div>

        <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500 mb-1">Total</span>
            <span className="text-lg font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                ${totalPrice}
            </span>
        </div>
    </div>
  );
};

export default OrdersCard;