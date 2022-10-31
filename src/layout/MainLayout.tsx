import { useState } from "react";
import { useLayoutEffect } from "react";
import { PropsWithChildren } from "react";
import { LogoIcon } from "../assets/Logo";
import classes from "./MainLayout.module.scss";


const DisplayTime = () => {
  const [time, setTime] = useState<string>('');
  useLayoutEffect(() => {
    function doTime(){
      setTime(new Date().toLocaleTimeString('en', {timeStyle: "short", hour12: false}))
    }
    const interval = setInterval(doTime, 1000);
    doTime();
    return () => {
      clearInterval(interval);
    }
  }, []);
  return <div className={classes.time}>{time}</div>
}
export const MainLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className={classes.MainLayout}>
      <header>
        <LogoIcon />
        <DisplayTime/>
      </header>
      {children}
    </div>
  );
};
