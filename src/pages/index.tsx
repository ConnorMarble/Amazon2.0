import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import Banner from "src/components/Banner";
import ProductFeed from "src/components/ProductFeed";
import { ProductInterface } from "src/types/interface";

interface HomeProps {
  products: ProductInterface[];
}

const Home: NextPage<HomeProps> = ({ products }: HomeProps) => {
  return (
    <>
      <Banner />
      <ProductFeed products={products} />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const session = await getSession();
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products,
      session,
    },
  };
};
