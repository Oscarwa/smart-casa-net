import { FC, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { Check, Edit2, Eye, Trash2 } from "lucide-react";
import { AppContext } from "@/AppContext";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/Event";
import { useDeleteEventMutation } from "./events.api";

export const EventActions: FC<{ event: Event }> = ({ event }) => {
  const navigate = useNavigate();
  const { currentEvent, setCurrentEvent } = useContext(AppContext);
  const { mutate: deleteEvent } = useDeleteEventMutation(event.id!);

  const handleDelete = () => {
    deleteEvent();
    if (currentEvent?.id === event.id) {
      setCurrentEvent(null);
      navigate("/");
    }
  };

  const setEventHandler = () => {
    setCurrentEvent(event);
  };
  return (
    <>
      <Button className="mr-1" variant="default" size="icon" asChild>
        <Link to={`./${event.id}`}>
          <Eye />
        </Link>
      </Button>
      <Button asChild className="mr-1" variant="outline" size="icon">
        <Link to={`/events/edit/${event.id}`}>
          <Edit2 />
        </Link>
      </Button>
      <Button
        onClick={handleDelete}
        className="mr-1"
        variant="outline"
        size="icon"
      >
        <Trash2 />
      </Button>
      <Button
        onClick={setEventHandler}
        className="mr-1"
        variant="outline"
        size="icon"
      >
        <Check />
      </Button>
    </>
  );
};
