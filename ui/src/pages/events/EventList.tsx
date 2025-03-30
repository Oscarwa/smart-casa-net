import { FC, useContext } from "react";
import { AppContext } from "@/AppContext";
import { useTranslation } from "react-i18next";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Event } from "@/types/Event";
import { EventActions } from "./EventActions";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const EventsList: FC = () => {
  const { t } = useTranslation();
  const { events } = useContext(AppContext);
  return (
    <section>
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          {t("events")}
        </h2>
        <Button asChild>
          <Link to="/events/create">{t("createEvent")}</Link>
        </Button>
      </header>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("name")}</TableHead>
            <TableHead className="w-[200px]">{t("date")}</TableHead>
            <TableHead>{t("location")}</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event: Event) => (
            <TableRow key={event.id}>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.date.toISOString()}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell className="text-right">
                <EventActions event={event} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
