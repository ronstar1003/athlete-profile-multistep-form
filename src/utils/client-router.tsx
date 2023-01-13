import type {
  ComponentProps,
  MouseEventHandler,
  PropsWithChildren,
} from "react";
import React, { useContext, useEffect } from "react";
import { useState, forwardRef } from "react";

interface Context {
  route: string;
  setRoute: (route: string, replace?: boolean) => void;
}

export const ClientRouterContext = React.createContext<Context>({
  route: "/",
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setRoute: (route: string, replace?: boolean) => {},
});

interface RouteProps {
  path: string;
  Component: ({ param }: { param: string }) => JSX.Element;
}

export const ClientRoute = ({ Component, path }: RouteProps) => {
  const { route } = useContext(ClientRouterContext);

  const pathScreen = path.split("/")[1] || path.split("/")[0];
  const [routeScreen, routeParam] = route.split("/").slice(1);

  return routeScreen === pathScreen ? (
    <Component param={routeParam || ""} />
  ) : null;
};

interface LinkProps extends ComponentProps<"a"> {
  to: string;
  replace?: boolean;
}

// eslint-disable-next-line react/display-name
export const ClientLink = forwardRef(
  (
    { children, to, ...restProps }: LinkProps,
    ref: React.LegacyRef<HTMLAnchorElement> | undefined
  ) => {
    const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
      e.preventDefault();
      window.history.pushState({}, "", to);
      window.dispatchEvent(new PopStateEvent("popstate"));
    };

    return (
      <a href={to} ref={ref} {...restProps} onClick={handleClick}>
        {children}
      </a>
    );
  }
);

interface RouterProps {
  whileLoading?: JSX.Element;
}

export const ClientRouter = ({
  children,
  whileLoading,
}: PropsWithChildren<RouterProps>) => {
  const { setRoute } = useContext(ClientRouterContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    syncWithUrl();
    window.onhashchange = (e) => {
      syncWithUrl();
    };
    window.addEventListener("popstate", handlePopState);
    setLoading(false);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handlePopState = () => {
    syncWithUrl();
  };

  const syncWithUrl = () => {
    setRoute(window.location.pathname);
  };

  return <>{loading ? whileLoading : children}</>;
};

export const ClientRouterProvider = ({
  children,
}: PropsWithChildren<object>) => {
  const [route, setRoute] = useState<string>("/");

  return (
    <ClientRouterContext.Provider
      value={{
        route,
        setRoute,
      }}
    >
      {children}
    </ClientRouterContext.Provider>
  );
};
