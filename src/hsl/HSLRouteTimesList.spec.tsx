import React from "react";
import { render, screen } from "@testing-library/react";
import HSLModule from ".";
import { HSLRouteTimesList } from "./HSLRouteTimesList";
import * as HSLModel from "./HSLModel";
import * as HSLService from "./HSLServiceProvider";
import {arrivalTimeTextFactory, getMidnight} from "./utils";

const mockService = jest.spyOn(HSLService, "useHSLService").mockReturnValue({
  getStop(id: string){
    return () => {}
  }
});

const mockData = {
  stop: {
    name: "Energia-aukio",
    stoptimesWithoutPatterns: [
      {
        trip: {
          routeShortName: "15",
        },
        scheduledArrival: 51660,
        arrivalDelay: 0,
      },
      {
        trip: {
          routeShortName: "15",
        },
        scheduledArrival: 52620,
        arrivalDelay: 0,
      },
      {
        trip: {
          routeShortName: "15",
        },
        scheduledArrival: 53100,
        arrivalDelay: 0,
      },
      {
        trip: {
          routeShortName: "15",
        },
        scheduledArrival: 53580,
        arrivalDelay: 0,
      },
      {
        trip: {
          routeShortName: "15",
        },
        scheduledArrival: 54060,
        arrivalDelay: 0,
      },
    ],
  },
};

describe("Route times at the stop", () => {
  test("Render List", () => {
    const context = render(
      <HSLModule>
        <HSLRouteTimesList></HSLRouteTimesList>
      </HSLModule>
    );
    expect(context.getByTestId("HSLRouteTimesList")).not.toBeUndefined();
  });

  test("Render List Items", () => {
    jest.spyOn(HSLModel, "useHSLModel").mockReturnValue(new HSLModel.HSLModelImpl(mockData));
    // jest.spyOn(Utils, "useHSLModel").mockReturnValue(new HSLModel.HSLModelImpl(mockData));
    const context = render(
      <HSLModule>
        <HSLRouteTimesList></HSLRouteTimesList>
      </HSLModule>
    );

    const getArrivalText = arrivalTimeTextFactory(getMidnight(), new Date());

    expect(context.getByTestId("HSLRouteTimesList").children.length).toBe(6);
    expect(context.getByTestId("HSLRouteTimesListHeader").children[1].textContent).toBe(mockData.stop.name);
    expect(context.getByTestId("HSLRouteTimesListItem0")).toBeDefined();
    expect(context.getByTestId("HSLRouteTimesListItem0_arrivalTime")).toBeDefined();
    expect(context.getByTestId("HSLRouteTimesListItem0_arrivalTime").textContent).toBe(getArrivalText(mockData.stop.stoptimesWithoutPatterns[0].scheduledArrival).join(" / "));
    expect(context.getByTestId("HSLRouteTimesListItem1")).toBeDefined();
    expect(context.getByTestId("HSLRouteTimesListItem1_arrivalTime").textContent).toBe(getArrivalText(mockData.stop.stoptimesWithoutPatterns[1].scheduledArrival).join(" / "));
    expect(context.getByTestId("HSLRouteTimesListItem2")).toBeDefined();
    expect(context.getByTestId("HSLRouteTimesListItem2_arrivalTime").textContent).toBe(getArrivalText(mockData.stop.stoptimesWithoutPatterns[2].scheduledArrival).join(" / "));
    expect(context.getByTestId("HSLRouteTimesListItem3")).toBeDefined();
    expect(context.getByTestId("HSLRouteTimesListItem3_arrivalTime").textContent).toBe(getArrivalText(mockData.stop.stoptimesWithoutPatterns[3].scheduledArrival).join(" / "));
    expect(context.getByTestId("HSLRouteTimesListItem4")).toBeDefined();
    expect(context.getByTestId("HSLRouteTimesListItem4_arrivalTime").textContent).toBe(getArrivalText(mockData.stop.stoptimesWithoutPatterns[4].scheduledArrival).join(" / "));
  });
});
