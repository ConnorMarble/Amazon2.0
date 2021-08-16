import type { GetServerSideProps, NextPage } from "next";
import Banner from "src/components/Banner";
import ProductFeed from "src/components/ProductFeed";
import { ProductsInterface } from "src/types/interface";

interface HomeProps {
  products: ProductsInterface[];
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
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products,
    },
  };
};
