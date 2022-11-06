import { MainLayout } from "../layout/MainLayout";
import { HSLRouteTimesList } from "../hsl/HSLRouteTimesList";
import classes from "./HSLStopsPage.module.scss";

export const HSLListStopRoutesPage = () => {
  return (
    <MainLayout>
      <div className={classes.HSLStopsPage}>
        <HSLRouteTimesList stopId="HSL:1201110" />
      </div>
    </MainLayout>
  );
};
