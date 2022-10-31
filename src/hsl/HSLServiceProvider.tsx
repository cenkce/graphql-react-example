import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useHSLDispatch } from "./HSLModel";

type HSLContextService = {
  getStop: (id: string) => () => void;
};
const HSLContext = createContext<HSLContextService | null>(null);
export const useHSLService = () => {
  return useContext(HSLContext);
};
export const HSLServiceProvider = (props: PropsWithChildren<{}>) => {
  const dispatch = useHSLDispatch();
  const service = useMemo(() => {
    return {
      getStop(id: string) {
        const controller = new AbortController();

        fetch(
          "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            signal: controller.signal,
            body: JSON.stringify({
              query: `{
                stop(id: "${id}") {
                  name
                  stoptimesWithoutPatterns {
                    trip {
                      routeShortName
                    }
                    scheduledArrival
                    arrivalDelay
                  }
                }
              }`
            })
          }
        )
          .then((r) => r.json())
          .then((data) => {
            dispatch?.({
              type: "stops",
              payload: data?.data?.stop
            });
          });

        return () => {
          controller.abort();
        }
      }
    };
  }, [dispatch]);

  return (
    <HSLContext.Provider value={service}>{props.children}</HSLContext.Provider>
  );
};
