/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
// eslint-disable-next-line @typescript-eslint/no-var-requires
// import stripe from "stripe";
// eslint-disable-next-line import/newline-after-import
import { ProductInterface } from "../../types/interface";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type ItemType = ProductInterface[];

interface RequestInterface {
  body: {
    items: ItemType;
    email: string;
  };
}

export default async (req: RequestInterface, res): Promise<any> => {
  const { items, email } = req.body;
  console.log(email, items);

  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1JPHRAB7P6MLsONNfr8s055e"],
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA", "FR"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  console.log("session created!", session.id);

  res.status(200).json({ id: session.id });
};
