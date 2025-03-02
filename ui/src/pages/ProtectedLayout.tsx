import { FC, useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AppContext } from "@/AppContext";
import { Navbar } from "@/components/Navbar";
import { useGetMeQuery } from "./account/account.api";

export const ProtectedLayout: FC = () => {
  const { token } = useContext(AppContext);

  const { data } = useGetMeQuery();

  console.log("/me - data", data);

  if (!token) {
    return <Navigate to="/auth/signin" replace />;
  }
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 overflow-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};
