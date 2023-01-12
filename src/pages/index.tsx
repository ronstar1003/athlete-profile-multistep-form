import { type NextPage } from "next";
import Head from "next/head";

import DashboardScreen from "../screens/DashboardScreen";
import FormScreen from "../screens/FormScreen";

import Loading from "../components/Loading";

import {
  ClientRoute,
  ClientRouter,
  ClientRouterProvider,
} from "../utils/client-router";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
});

const Home: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Athelete Profile Collector</title>
        <meta name="description" content="Athelete Profile Collector" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClientRouterProvider>
        <ClientRouter whileLoading={<Loading />}>
          <ClientRoute path="/" component={<DashboardScreen />} />
          <ClientRoute path="/form" component={<FormScreen />} />
        </ClientRouter>
      </ClientRouterProvider>
    </ThemeProvider>
  );
};

export default Home;
