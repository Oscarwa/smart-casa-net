import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { GuestActions } from "./GuestActions";
import { Guest } from "@/types/Guest";
import { useGetGuestsQuery } from "./guests.api";
import { UpsertGuestForm } from "./UpsertGuestForm";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

export const GuestList: FC = () => {
  const { t } = useTranslation();
  const { eventId } = useParams();
  const { data: guests = [] } = useGetGuestsQuery(Number(eventId));
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  return (
    <section>
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          {t("guests")}
        </h2>
      </header>
      {selectedGuest ? (
        <UpsertGuestForm guest={selectedGuest} selectGuest={setSelectedGuest} />
      ) : (
        <UpsertGuestForm guest={null} selectGuest={setSelectedGuest} />
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("name")}</TableHead>
            <TableHead>{t("phone")}</TableHead>
            <TableHead>{t("rsvp")}</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests?.map((guest: Guest) => (
            <TableRow key={guest.id}>
              <TableCell>
                {guest.firstName} {guest.lastName}
              </TableCell>
              <TableCell>{guest.phone}</TableCell>
              <TableCell>TBD</TableCell>
              <TableCell className="text-right">
                <GuestActions guest={guest} selectGuest={setSelectedGuest} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
