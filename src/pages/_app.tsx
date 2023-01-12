import { type AppType } from "next/app";

import { api } from "../utils/api";

import { CssBaseline } from "@mui/material";

import Loading from "../components/Loading";
import Copyright from "../components/Copyright";

import "../styles/globals.css";
import Header from "../components/Header";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div>
      <CssBaseline />
      <Header />
      {typeof window === "undefined" ? (
        <div>
          <Loading />
        </div>
      ) : (
        <Component {...pageProps} />
      )}
      <Copyright sx={{ mt: 4 }} />
    </div>
  );
};

export default api.withTRPC(MyApp);
