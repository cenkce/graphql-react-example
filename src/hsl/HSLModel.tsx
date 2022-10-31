import produce from "immer";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  Reducer,
  useContext,
  useReducer,
} from "react";
type HSLState = {
  stop: Stop | null;
};

export class HSLModelImpl {
  constructor(private state: HSLState | null) {}

  getStop() {
    return this.state?.stop;
  }
}

type actions = { type: "stops"; payload: any };
const HSLModelContent = createContext<HSLModelImpl>(new HSLModelImpl(null));
const HSLModelDispatchContext = createContext<Dispatch<actions> | null>(null);

export function HSLStateProvider(
  props: PropsWithChildren<{ model: HSLState }>
) {
  return (
    <HSLModelContent.Provider value={new HSLModelImpl(props.model)}>
      {props.children}
    </HSLModelContent.Provider>
  );
}

type Stop = {
    name: string;
    stoptimesWithoutPatterns: {
      trip: {
        routeShortName: string;
      }
      scheduledArrival: number;
      arrivalDelay: number
    }[];
};

export function HSLModelDispatchProvider(
  props: PropsWithChildren<{ dispatch: Dispatch<actions> }>
) {
  return (
    <HSLModelDispatchContext.Provider value={props.dispatch}>
      {props.children}
    </HSLModelDispatchContext.Provider>
  );
}

const reducer: Reducer<HSLState, actions> = produce((draft, action) => {
  switch (action.type) {
    case "stops":
      draft.stop = action.payload;
      break;
  }
});

export const useHSLModel = () => {
  return useContext(HSLModelContent);
};

export const useHSLDispatch = () => {
  return useContext(HSLModelDispatchContext);
};

export const HSLModelProvider = (props: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, { stop: null });
  return (
    <HSLModelDispatchProvider dispatch={dispatch}>
      <HSLStateProvider model={state}>{props.children}</HSLStateProvider>
    </HSLModelDispatchProvider>
  );
};
