import { FC, useContext } from "react";
import { UpsertEventForm } from "./UpsertEventForm";
import { Event } from "@/types/Event";
import { useParams } from "react-router";
import { AppContext } from "@/AppContext";

export const UpsertEvent: FC = () => {
  const { eventId } = useParams();
  const { events } = useContext(AppContext);

  const event = eventId
    ? events?.find((e: Event) => e.id === Number(eventId))
    : ({
        name: "",
        spouseOne: "",
        spouseTwo: "",
        date: new Date(),
        description: "",
        location: "",
      } as Event);
  return (
    <section>
      <UpsertEventForm event={event} />
    </section>
  );
};
