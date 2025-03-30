import { FC } from "react";
import { Link, useParams } from "react-router";
import { useGetEventsQuery } from "./events.api";
import { Event } from "@/types/Event";
import { useTranslation } from "react-i18next";

export const EventDetail: FC = () => {
  const { t } = useTranslation();
  const { eventId } = useParams();
  const { data: events } = useGetEventsQuery();

  const event = events?.find((b: Event) => b.id === Number(eventId));

  return (
    <section>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
        {t("event")}: {event?.name}
      </h2>
      <div className="mt-8 grid sm:grid-cols-2 gap-x-10 gap-y-8 justify-center">
        <div>
          <p className="mt-2 font-semibold text-xl">{t("guests")}</p>
          <span className="text-4xl font-bold text-indigo-500">
            {event?.date?.toISOString() ?? "N/A"}
          </span>
          <p className="mt-2 text-[17px] text-muted-foreground">
            {t("guestDescription")}
          </p>
        </div>
        <div>
          <p className="mt-2 font-semibold text-xl">{t("firstSpouse")}</p>
          <span className="text-4xl font-bold text-indigo-400">
            {event?.spouseOne}
          </span>
          <p className="mt-2 text-[17px] text-muted-foreground">
            {t("dontGoCrazy")}
          </p>
        </div>
        <div>
          <p className="mt-2 font-semibold text-xl">{t("location")}</p>
          <span className="text-4xl font-bold text-indigo-700">
            {event?.spouseTwo}
          </span>
          <p className="mt-2 text-[17px] text-muted-foreground">
            {t("dontGoCrazy")}
          </p>
        </div>
        <div>
          <p className="mt-2 font-semibold text-xl">{t("amount")}</p>
          <span className="text-4xl font-bold text-emerald-500">
            {event?.spouseOneType}
          </span>
          <p className="mt-2 text-[17px] text-muted-foreground">
            {t("dontGoCrazy")}
          </p>
        </div>
      </div>
      <hr className="my-4" />
      <div className="grid md:grid-cols-2 gap-6">
        {/* {event?.entries?.map((entry) => (
          <div className="flex gap-6 hover:ring rounded-lg p-2 -mx-2 sm:mx-0 relative group">
            <div className="h-12 aspect-square shrink-0 rounded-lg bg-muted" />
            <div className="">
              <span className="font-semibold tracking-tight text-lg">
                {entry.description}
              </span>
              <p className="mt-1 text-sm text-muted-foreground">
                {toCurrency(entry.amount)}
              </p>
            </div>
            <Button
              variant="outline"
              asChild
              className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Link
                to={`/events/${eventId}/events/${eventId}/entries/${entry.id}/edit`}
              >
                <Edit2 />
              </Link>
            </Button>
          </div>
        ))} */}
        <Link to={`/events/${eventId}/events/${eventId}/entries/create`}>
          <div className="flex justify-center items-center gap-6 border-2 border-dashed rounded-lg p-2 -mx-2 text-muted-foreground cursor-pointer hover:border-accent">
            <span>{t("createChecklist")}</span>
          </div>
        </Link>
      </div>
    </section>
  );
};
