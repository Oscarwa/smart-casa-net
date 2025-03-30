import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useGetBudgetsQuery } from "./budget.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Budget } from "@/types/Budget";
import { BudgetActions } from "./BudgetActions";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router";
import { toCurrency, toInteger } from "@/lib/number-utils";

export const BudgetList: FC = () => {
  const { t } = useTranslation();
  const { eventId } = useParams();
  const { data: budgets } = useGetBudgetsQuery(Number(eventId));

  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          {t("budgets")}
        </h2>
        <Button asChild>
          <Link to={`/events/${eventId}/budgets/create`}>
            {t("createBudget")}
          </Link>
        </Button>
      </header>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("name")}</TableHead>
            <TableHead>{t("guestCount")}</TableHead>
            <TableHead>{t("amount")}</TableHead>
            <TableHead>{t("destination")}</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgets?.map((budget: Budget) => (
            <TableRow key={budget.id}>
              <TableCell>{budget.description}</TableCell>
              <TableCell>
                {budget.guestCount ? toInteger(budget.guestCount) : "N/A"}
              </TableCell>
              <TableCell>
                {budget.desiredBudget
                  ? toCurrency(budget.desiredBudget)
                  : "N/A"}
              </TableCell>
              <TableCell>{budget.destination ?? "N/A"}</TableCell>
              <TableCell className="text-right">
                <BudgetActions id={budget.id!} eventId={Number(eventId)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
