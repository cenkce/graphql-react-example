import { useState } from "react";
import { useEffect } from "react";
import { BusIcon } from "../assets/Bus";
import { useHSLModel } from "./HSLModel";
import { useHSLService } from "./HSLServiceProvider";
import classNames from "./HSLRouteTimesList.module.scss";
import { arrivalTimeTextFactory, getMidnight } from "./utils";

const SERVICE_UPDATE_INTERVAL = 10;
export const HSLRouteTimesList = () => {
  const service = useHSLService();
  const model = useHSLModel();
  const stop = model.getStop();
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
  }, []);

  useEffect(() => {
    let cancel: undefined | (() => void);
    function getData() {
      cancel?.();
      cancel = service?.getStop("HSL:1201110");
    }

    const interval = setInterval(getData, SERVICE_UPDATE_INTERVAL * 1000);
    getData();

    return () => {
      cancel?.();
      clearInterval(interval);
    };
  }, [service]);

  const midnight = getMidnight();

  const getArrivalText = arrivalTimeTextFactory(midnight, now);

  return (
    <ul
      className={classNames.HSLRouteTimesList}
      data-testid={"HSLRouteTimesList"}
    >
      <li data-testid="HSLRouteTimesListHeader" className={classNames.header}>
        <h5>Buses arriving to </h5>
        <h2>{stop?.name}</h2>
      </li>
      {stop?.stoptimesWithoutPatterns.map(
        ({ trip, arrivalDelay, scheduledArrival }, index) => {
          return (
            <li
              data-testid={"HSLRouteTimesListItem" + index}
              className={
                classNames.listItem +
                " " +
                (arrivalDelay
                  ? classNames.listItem__delayed_true
                  : classNames.listItem__delayed_false)
              }
              key={scheduledArrival}
            >
              <BusIcon />
              <div className={classNames.listItemBody}>
                <div>
                  <div className={classNames.routeShortName}>
                    {trip.routeShortName}
                  </div>
                  <div className={classNames.delayText}>
                    {arrivalDelay
                      ? new Intl.NumberFormat("en", {
                          style: "unit",
                          unit: "minute",
                          unitDisplay: "long",
                        }).format(arrivalDelay) + " late"
                      : ""}
                  </div>
                </div>
                <div
                  data-testid={"HSLRouteTimesListItem" + index + "_arrivalTime"}
                >
                  {getArrivalText(scheduledArrival).join(" / ")}
                </div>
              </div>
            </li>
          );
        }
      )}
    </ul>);
}
