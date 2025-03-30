import { AppContext } from "./AppContext";
import { BrowserRouter, Routes, Route } from "react-router";
import "./lib/multi-language";

import { SignIn } from "./pages/auth/SignIn";
import { AuthLayout } from "./pages/auth/AuthLayout";
import { SignUp } from "./pages/auth/SignUp";
import { useState } from "react";
import { ProtectedLayout } from "./pages/ProtectedLayout";
import { MyAccount } from "./pages/account/MyAccount";
import { Settings } from "./pages/account/Settings";
import { PasswordReset } from "./pages/auth/PasswordReset";
import { UpsertEvent } from "./pages/events/UpsertEvent";
import { EventsList } from "./pages/events/EventList";
import { GuestList } from "./pages/guests/GuestList";
import { BudgetList } from "./pages/budget/BudgetList";
import { UpsertBudget } from "./pages/budget/UpsertBudget";
import { Event } from "./types/Event";
import { BudgetDetail } from "./pages/budget/BudgetDetail";
import { UpsertBudgetEntry } from "./pages/budget/UpsertBudgetEntry";
import { EventDetail } from "./pages/events/EventDetails";
import { Home } from "./pages/home/Home";

type AppUser = {
  email: string;
};

const App = () => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const clear = () => {
    localStorage.removeItem("token");
    setCurrentEvent(null);
    setUser(null);
  };

  const context = {
    token: localStorage.getItem("token") ?? "RIP token",
    user,
    setUser,
    currentEvent,
    setCurrentEvent,
    events,
    setEvents,
    clear,
  };

  return (
    <AppContext.Provider value={context}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<Home />} />
            <Route path="account">
              <Route index element={<MyAccount />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="events">
              <Route index element={<EventsList />} />
              <Route path="create" element={<UpsertEvent />} />
              <Route path="edit/:eventId" element={<UpsertEvent />} />
              <Route path=":eventId">
                <Route index element={<EventDetail />} />
                <Route path="guests">
                  <Route index element={<GuestList />} />
                </Route>
                <Route path="budgets">
                  <Route index element={<BudgetList />} />
                  <Route path="create" element={<UpsertBudget />} />
                  <Route path=":budgetId">
                    <Route index element={<BudgetDetail />} />
                    <Route path="edit" element={<UpsertBudget />} />
                    <Route path="entries">
                      <Route path="create" element={<UpsertBudgetEntry />} />
                      <Route
                        path=":budgetEntryId/edit"
                        element={<UpsertBudgetEntry />}
                      />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="password-reset" element={<PasswordReset />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
