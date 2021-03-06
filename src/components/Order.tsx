/* eslint-disable react/no-unescaped-entities */
import { ReactElement } from "react";
import moment from "moment";
import Currency from "react-currency-formatter";
import { OrderInterface } from "src/types/interface";

interface OrderProps {
  order: OrderInterface;
}

export default function Order({ order }: OrderProps): ReactElement {
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 text-sm text-gray-600">
        <div className="">
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{moment.unix(order.timestamp).format("MM/DD/YYYY")}</p>
        </div>

        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <Currency quantity={order.amount} /> - Next Day Delivery{" "}
            <Currency quantity={order.amountShipping} />
          </p>
        </div>

        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {order.items.length} items
        </p>

        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          ORDER #{order.id}
        </p>
      </div>

      <div className="p-5 sm:p-10 bg-white">
        <div className="flex space-x-6 overflow-x-auto">
          {order.images.map((image) => (
            <div className="relative" key={image}>
              <img src={image} alt="" className="h-20 object-contain sm:h-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
