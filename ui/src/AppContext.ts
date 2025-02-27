import { createContext } from "react";

type AppContextType = {
  token: string;
  user: any;
  setUser: any;
  clear: VoidFunction;
};

export const AppContext = createContext<AppContextType>({
  token: localStorage.getItem("token") ?? "RIP",
  user: null,
  setUser: null,
  clear: () => null,
});
