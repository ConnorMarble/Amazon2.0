/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react/no-unescaped-entities */
import { getSession, useSession } from "next-auth/client";
import moment from "moment";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";
import db from "../../firebase.config";
import Order from "../components/Order";
import { OrderInterface } from "src/types/interface";

interface OrdersProps {
  orders: OrderInterface[];
}

const Orders: NextPage<OrdersProps> = ({ orders }: OrdersProps) => {
  const [session] = useSession();
  const router = useRouter();

  return (
    <div>
      <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
        Your orders
      </h1>

      {session ? (
        <h2 className="text-xl">
          {orders.length > 0 ? (
            <>
              {orders.length} Order{orders.length > 1 && "s"}
            </>
          ) : (
            <>
              You don't have any order yet. Go visit the{" "}
              <button
                onClick={() => router.push("/")}
                className="link text-yellow-400 underline hover:no-underline"
              >
                Homepage Store
              </button>{" "}
              to purchase some items.
            </>
          )}
        </h2>
      ) : (
        <h2>Please sign in to see your orders.</h2>
      )}

      <div className="mt-5 space-y-4">
        {orders?.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // Get the user logged in credentials...
  const session = await getSession(context);

  if (!session) {
    return { props: {} };
  }

  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return { props: { orders } };
};
