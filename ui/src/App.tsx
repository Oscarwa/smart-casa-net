import { AppContext } from "./AppContext";
import { BrowserRouter, Routes, Route } from "react-router";

import { SignIn } from "./pages/auth/SignIn";
import { AuthLayout } from "./pages/auth/AuthLayout";
import { SignUp } from "./pages/auth/SignUp";
import { useState } from "react";
import { ProtectedLayout } from "./pages/ProtectedLayout";
import { MyAccount } from "./pages/account/MyAccount";
import { Settings } from "./pages/account/Settings";
import { PasswordReset } from "./pages/auth/PasswordReset";

type AppUser = {
  email: string;
};

const App = () => {
  const [user, setUser] = useState<AppUser | null>(null);

  const clear = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const context = {
    token: localStorage.getItem("token") ?? "RIP token",
    user,
    setUser,
    clear,
  };

  return (
    <AppContext.Provider value={context}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<section>Home</section>} />
            <Route path="event" element={<section>Event</section>} />
            <Route path="guests" element={<section>Guests</section>} />
            <Route path="budget" element={<section>Budget</section>} />
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="password-reset" element={<PasswordReset />} />
          </Route>
          <Route path="account" element={<ProtectedLayout />}>
            <Route index element={<MyAccount />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
