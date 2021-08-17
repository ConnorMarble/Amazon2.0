import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { ReactElement } from "react";
import Currency from "react-currency-formatter";
import { useSelector } from "react-redux";
import CheckoutProduct from "@src/components/product/CheckoutProduct";
import {
  selectItems,
  selectTotal,
} from "src/redux/features/basket/basketSlice";

const stripePromise = loadStripe(process.env.stripe_public_key);

export default function Checkout(): ReactElement {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [session] = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call the backend to create a checkout session...
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });

    // After have created a session, redirect the user/customer to Stripe Checkout
    // eslint-disable-next-line no-unused-vars
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
  };

  return (
    <div className="lg:flex">
      <div className="flex-grow m-5 shadow-sm">
        <Image
          alt=""
          src="https://links.papareact.com/ikj"
          width={1020}
          height={250}
          objectFit="contain"
        />
        <div className="flex flex-col p-5 space-y-10 bg-white">
          <h1 className="text-3xl border-b pb-4">
            {items.length === 0
              ? "Your Amazon Basket is Empty."
              : "Shopping Basket"}
          </h1>
          {items.map((item) => (
            <CheckoutProduct key={item.id} product={item} />
          ))}
        </div>
      </div>
      <div className="flex flex-col bg-white p-10 shadow-md">
        {items.length > 0 && (
          <>
            <h2 className="whitespace-nowrap">
              Subtotal ({items.length}) items:{" "}
              <span className="font-bold">
                <Currency quantity={total} />
              </span>
            </h2>
            <button
              role="link"
              onClick={() => createCheckoutSession()}
              disabled={!session}
              className={`button mt-2 ${
                !session &&
                "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              {!session ? "Sign in to checkout" : "Proceed to checkout"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
