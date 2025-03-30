import { FC } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useDeleteGuestMutation } from "./guests.api";
import { Guest } from "@/types/Guest";
import { useParams } from "react-router";

type GuestActionsProps = {
  guest: Guest;
  selectGuest: (guest: Guest | null) => void;
};

export const GuestActions: FC<GuestActionsProps> = ({ guest, selectGuest }) => {
  const { eventId } = useParams();
  const { mutate: deleteGuest } = useDeleteGuestMutation(
    guest.id!,
    Number(eventId)
  );

  const handleDelete = () => {
    deleteGuest();
  };

  return (
    <>
      <Button
        onClick={() => selectGuest(guest)}
        className="mr-1"
        variant="outline"
        size="icon"
      >
        <Edit2 />
      </Button>
      <Button
        onClick={handleDelete}
        className="mr-1"
        variant="outline"
        size="icon"
      >
        <Trash2 />
      </Button>
    </>
  );
};
