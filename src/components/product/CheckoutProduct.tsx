import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { ReactElement } from "react";
import Currency from "react-currency-formatter";
import {
  addToBasket,
  removeFromBasket,
} from "src/redux/features/basket/basketSlice";
import { useAppDispatch } from "src/redux/hooks";
import { ProductInterface } from "src/types/interface";

interface CheckoutProductProps {
  product: ProductInterface;
}

export default function CheckoutProduct({
  product,
}: CheckoutProductProps): ReactElement {
  const dispatch = useAppDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket(product));
  };

  return (
    <div className="grid grid-cols-5">
      <Image
        src={product.image}
        alt=""
        height={200}
        width={200}
        objectFit="contain"
      />
      <div className="col-span-3 mx-5">
        <p>{product.title}</p>
        <div className="flex">
          {Array(product.rating)
            .fill(0)
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{product.description}</p>
        <Currency quantity={product.price} />
        {product.hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
              loading="lazy"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 justify-self-end">
        <button className="button" onClick={() => addItemToBasket()}>
          Add to Basket
        </button>
        <button className="button" onClick={() => removeItemFromBasket()}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
}
