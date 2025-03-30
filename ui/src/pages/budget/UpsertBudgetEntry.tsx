import { Budget } from "@/types/Budget";
import { FC } from "react";
import { useParams } from "react-router";
import { useGetBudgetsQuery } from "./budget.api";
import { UpsertBudgetEntryForm } from "./UpsertBudgetEntryForm";

export const UpsertBudgetEntry: FC = () => {
  const { eventId, budgetId, budgetEntryId } = useParams();
  const { data: budgets } = useGetBudgetsQuery(Number(eventId));

  const budget = budgets?.find((b: Budget) => b.id === Number(budgetId));

  const budgetEntry = budget?.entries?.find(
    (e) => e.id === Number(budgetEntryId)
  );

  return (
    <section>
      <UpsertBudgetEntryForm budgetEntry={budgetEntry} />
    </section>
  );
};
