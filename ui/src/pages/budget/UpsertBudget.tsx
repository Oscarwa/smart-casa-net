import { Budget } from "@/types/Budget";
import { FC } from "react";
import { useParams } from "react-router";
import { useGetBudgetsQuery } from "./budget.api";
import { UpsertBudgetForm } from "./UpsertBudgetForm";

export const UpsertBudget: FC = () => {
  const { eventId, budgetId } = useParams();
  const { data: budgets } = useGetBudgetsQuery(Number(eventId));

  const budget = budgets?.find((b: Budget) => b.id === Number(budgetId ?? "0"));

  return (
    <section>
      <UpsertBudgetForm budget={budget} />
    </section>
  );
};
