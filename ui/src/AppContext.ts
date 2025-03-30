import { createContext, Dispatch, SetStateAction } from "react";
import { Event } from "./types/Event";

type AppContextType = {
  token: string;
  user: any;
  setUser: any;
  currentEvent: Event | null;
  setCurrentEvent: Dispatch<SetStateAction<Event | null>>;
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;

  clear: VoidFunction;
};

export const AppContext = createContext<AppContextType>({
  token: localStorage.getItem("token") ?? "RIP",
  user: null,
  setUser: null,
  currentEvent: null,
  setCurrentEvent: () => null,
  events: [],
  setEvents: () => null,
  clear: () => null,
});
