import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { useGetBudgetsQuery } from "./budget.api";
import { toCurrency } from "@/lib/number-utils";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { BudgetEntry } from "@/types/Budget";

export const BudgetDetail: FC = () => {
  const { t } = useTranslation();
  const { eventId, budgetId } = useParams();
  const { data: budgets } = useGetBudgetsQuery(Number(eventId));

  const budget = budgets?.find((b) => b.id === Number(budgetId));

  const entriesTotal = budget?.entries?.reduce(
    (acc: number, entry: BudgetEntry) => acc + entry.amount,
    0
  );

  return (
    <section>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
        {t("budget")}: {budget?.description}
      </h2>
      <div className="mt-8 grid sm:grid-cols-2 gap-x-10 gap-y-8 justify-center">
        <div>
          <p className="mt-2 font-semibold text-xl">{t("guestCount")}</p>
          <span className="text-4xl font-bold text-indigo-500">
            {budget?.guestCount ?? "N/A"}
          </span>
          <p className="mt-2 text-[17px] text-muted-foreground">
            {t("guestDescription")}
          </p>
        </div>
        <div>
          <p className="mt-2 font-semibold text-xl">{t("desiredBudget")}</p>
          <span className="text-4xl font-bold text-indigo-400">
            {budget?.desiredBudget ? toCurrency(budget?.desiredBudget) : "N/A"}
          </span>
          <p className="mt-2 text-[17px] text-muted-foreground">
            {t("amountDescription")}
          </p>
        </div>
        <div>
          <p className="mt-2 font-semibold text-xl">{t("destination")}</p>
          <span className="text-4xl font-bold text-indigo-700">
            {budget?.destination ?? "N/A"}
          </span>
          <p className="mt-2 text-[17px] text-muted-foreground">
            {t("destinationDescription")}
          </p>
        </div>
        <div>
          <p className="mt-2 font-semibold text-xl">{t("estimatedBudget")}</p>
          <span className="text-4xl font-bold text-emerald-500">
            {toCurrency(entriesTotal ?? 0)}
          </span>
          <p className="mt-2 text-[17px] text-muted-foreground">
            {t("estimatedDescription")}
          </p>
        </div>
      </div>
      <hr className="my-4" />
      <div className="grid md:grid-cols-2 gap-6">
        {budget?.entries?.map((entry) => (
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
                to={`/events/${eventId}/budgets/${budgetId}/entries/${entry.id}/edit`}
              >
                <Edit2 />
              </Link>
            </Button>
          </div>
        ))}
        <Link to={`/events/${eventId}/budgets/${budgetId}/entries/create`}>
          <div className="flex justify-center items-center gap-6 border-2 border-dashed rounded-lg p-2 -mx-2 text-muted-foreground cursor-pointer hover:border-accent">
            <span>{t("createBudgetCategory")}</span>
          </div>
        </Link>
      </div>
    </section>
  );
};
