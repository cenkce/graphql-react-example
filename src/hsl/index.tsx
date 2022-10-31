import { PropsWithChildren } from "react";
import { HSLModelProvider } from "./HSLModel";
import { HSLServiceProvider } from "./HSLServiceProvider";

const HSLModule = (props: PropsWithChildren<{}>) => {
  return (
    <HSLModelProvider>
      <HSLServiceProvider>{props.children}</HSLServiceProvider>
    </HSLModelProvider>
  );
};

export default HSLModule;
