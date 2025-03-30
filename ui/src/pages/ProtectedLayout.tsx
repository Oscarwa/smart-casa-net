import { FC, useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate, useParams } from "react-router";
import { AppContext } from "@/AppContext";
import { Navbar } from "@/components/Navbar";
import { useGetMeQuery } from "./account/account.api";
import { useGetEventsQuery } from "./events/events.api";

export const ProtectedLayout: FC = () => {
  const params = useParams();
  const { token, setUser, setEvents, currentEvent, setCurrentEvent } =
    useContext(AppContext);
  const navigate = useNavigate();

  const { data, isSuccess, isLoading, isError, isRefetching } = useGetMeQuery();

  const { data: events, isSuccess: eventsSuccess } = useGetEventsQuery();

  useEffect(() => {
    if (!isLoading && isError) {
      navigate("/auth/signin");
    }
    if (!isRefetching && isSuccess && data) {
      setUser(data);
    }
  }, [isLoading, isError, isSuccess, isRefetching]);

  useEffect(() => {
    if (eventsSuccess) {
      setEvents(events);
    }
  }, [eventsSuccess, events]);

  if (!token) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (!currentEvent && events?.length && params?.eventId) {
    const event = events.find((e) => e.id === Number(params.eventId));
    if (event) {
      setCurrentEvent(event);
    }
  }
  // if (
  //   isSuccess &&
  //   !data?.events.length &&
  //   document.location.pathname !== "/events/create"
  // ) {
  //   console.log("No events for user", data?.username);
  //   return <Navigate to="/events/create" replace />;
  // }
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 overflow-auto p-4">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
