import { useDelete, useGet, usePatch, usePost } from "@/hooks/useApi";
import { Budget } from "@/types/Budget";

export const useGetBudgetsQuery = (eventId: number) =>
  useGet<Budget[]>("budgets" + eventId, `/api/budgets/${eventId}`);

export const useCreateBudgetMutation = (eventId: number) =>
  usePost(`/api/budgets/${eventId}`, { invalidateKeys: ["budgets" + eventId] });

export const useUpdateBudgetMutation = (id: number, eventId: number) =>
  usePatch(`/api/budgets/${id}`, { invalidateKeys: ["budgets" + eventId] });

export const useDeleteBudgetMutation = (id: number, eventId: number) =>
  useDelete(`/api/budgets/${id}`, { invalidateKeys: ["budgets" + eventId] });

export const useCreateBudgetEntryMutation = (
  eventId: number,
  budgetId: number
) =>
  usePost(`/api/budgets/${budgetId}/entries`, {
    invalidateKeys: ["budgets" + eventId],
  });

export const useUpdateBudgetEntryMutation = (
  eventId: number,
  budgetId: number,
  id: number
) =>
  usePatch(`/api/budgets/${budgetId}/entries/${id}`, {
    invalidateKeys: ["budgets" + eventId],
  });
