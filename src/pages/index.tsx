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
import ProfileViewScreen from "../screens/ProfileViewScreen";

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
          <ClientRoute path="/" Component={DashboardScreen} />
          <ClientRoute path="/form" Component={FormScreen} />
          <ClientRoute path="/view/:id" Component={ProfileViewScreen} />
        </ClientRouter>
      </ClientRouterProvider>
    </ThemeProvider>
  );
};

export default Home;
