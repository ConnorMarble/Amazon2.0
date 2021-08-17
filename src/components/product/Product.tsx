import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { ReactElement, useState } from "react";
import Currency from "react-currency-formatter";
import { addToBasket } from "src/redux/features/basket/basketSlice";
import { useAppDispatch } from "src/redux/hooks";
import { ProductInterface } from "src/types/interface";

interface ProductProps {
  product: ProductInterface;
}

const MAX_RATING = 5;
const MIN_RATING = 1;

export default function Product({ product }: ProductProps): ReactElement {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime] = useState(Math.random() < 0.5);
  const dispatch = useAppDispatch();

  const addItemToBasket = () => {
    const newProduct = { ...product, rating, hasPrime };
    dispatch(addToBasket(newProduct));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product.category}
      </p>
      <Image
        alt=""
        src={product.image}
        height={200}
        width={200}
        objectFit="contain"
      />
      <h4 className="my-3">{product.title}</h4>
      <div className="flex">
        {Array(rating)
          .fill(0)
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{product.description}</p>
      <div className="mb-5">
        <Currency quantity={product.price} />
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button onClick={() => addItemToBasket()} className="mt-auto button">
        Add to Basket
      </button>
    </div>
  );
}
