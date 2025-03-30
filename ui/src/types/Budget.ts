export type Budget = {
  id?: number;
  description: string;
  guestCount?: number;
  destination?: string;
  desiredBudget?: number;
  entries?: BudgetEntry[];
};

export type BudgetEntry = {
  id?: number;
  description: string;
  amount: number;
};
