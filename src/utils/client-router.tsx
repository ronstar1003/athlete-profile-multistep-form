import type {
  ComponentProps,
  MouseEventHandler,
  PropsWithChildren,
} from "react";
import React, { useContext, useEffect } from "react";
import { useState } from "react";

interface Context {
  route: string;
  setRoute: (route: string, replace?: boolean) => void;
}

export const ClientRouterContext = React.createContext<Context>({
  route: "/",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRoute: (route: string, replace?: boolean) => {},
});

interface RouteProps {
  path: string;
  component: JSX.Element;
}

export const ClientRoute = ({ component, path }: RouteProps) => {
  const { route } = useContext(ClientRouterContext);

  return route === `${path}` ? component : null;
};

interface LinkProps extends ComponentProps<"a"> {
  to: string;
  replace?: boolean;
}

export const ClientLink = ({
  children,
  to,
  replace,
  ...restProps
}: LinkProps) => {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    window.history.pushState({}, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <a href={to} {...restProps} onClick={handleClick}>
      {children}
    </a>
  );
};

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
