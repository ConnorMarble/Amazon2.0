/* eslint-disable react/no-unescaped-entities */
import { NextPage } from "next";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { clearBasket } from "@src/redux/features/basket/basketSlice";
import { useAppDispatch } from "@src/redux/hooks";

const Success: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearBasket());
  }, []);
  return (
    <div className=" flex flex-col p-10 bg-white">
      <div className="flex items-center space-x-2 mb-5">
        <CheckCircleIcon className="text-green-500 h-10" />
        <h1 className="text-3xl">Thank you, your order has been confirmed!</h1>
      </div>
      <p>
        Thank you for shopping with us. We'll send a confirmation once item has
        shipped, if you would like to check the status of your order(s) please
        press the link below.
      </p>
      <button onClick={() => router.push("/orders")} className="button mt-8">
        Go to my orders
      </button>
    </div>
  );
};

export default Success;
