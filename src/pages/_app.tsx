import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as AuthProvider } from "next-auth/client";
import { Provider as StoreProvider } from "react-redux";
import { store } from "src/redux/store";
import Layout from "src/layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <StoreProvider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </AuthProvider>
  );
}
export default MyApp;
