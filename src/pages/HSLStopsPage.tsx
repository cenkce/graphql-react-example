import { MainLayout } from "../layout/MainLayout";
import { HSLRouteTimesList } from "../hsl/HSLRouteTimesList";
import classes from "./HSLStopsPage.module.scss";

export const HSLStopsPage = () => {
  return (
    <MainLayout>
      <div className={classes.HSLStopsPage}>
        <HSLRouteTimesList />
      </div>
    </MainLayout>
  );
};
