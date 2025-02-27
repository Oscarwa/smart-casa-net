import { FC } from "react";
import { Outlet } from "react-router";

export const AuthLayout: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
