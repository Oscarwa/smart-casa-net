import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BudgetEntry } from "@/types/Budget";
import { Label } from "@radix-ui/react-label";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useCreateBudgetEntryMutation,
  useUpdateBudgetEntryMutation,
} from "./budget.api";

type UpsertBudgetEntryFormProps = {
  budgetEntry?: BudgetEntry;
};

export const UpsertBudgetEntryForm: FC<UpsertBudgetEntryFormProps> = ({
  budgetEntry,
}) => {
  const { eventId, budgetId, budgetEntryId } = useParams();
  const navigate = useNavigate();
  const { mutate: createBudgetEntry } = useCreateBudgetEntryMutation(
    Number(eventId),
    Number(budgetId)
  );
  const { mutate: updateBudgetEntry } = useUpdateBudgetEntryMutation(
    Number(eventId),
    Number(budgetId),
    Number(budgetEntryId)
  );
  const [formData, setFormData] = useState<BudgetEntry>(
    budgetEntry || { description: "", amount: 5_000 }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let _value: string | number = value;
    if ("amount" === name) {
      _value = Number(value);
    }
    setFormData({ ...formData, [name]: _value });
  };

  const handleCancel = () => {
    navigate(`/events/${eventId}/budgets/${budgetId}`);
  };

  const handleSubmit = () => {
    if (budgetEntry?.id) {
      updateBudgetEntry({ id: budgetEntry.id, ...formData });
    } else {
      createBudgetEntry(formData);
    }
    navigate(`/events/${eventId}/budgets/${budgetId}`);
  };
  return (
    <>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
        {budgetEntry?.id ? "Edit budget category" : "Create budget category"}
      </h2>

      <div className="grid w-full max-w-lg items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Input
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Venue, Catering, Photo & Video ..."
          className="mb-4"
        />
      </div>
      <div className="grid w-full max-w-lg items-center gap-1.5">
        <Label htmlFor="amount">Amount</Label>
        <Input
          name="amount"
          type="number"
          value={formData.amount ?? ""}
          onChange={handleInputChange}
          className="mb-4"
        />
      </div>

      <Button variant="secondary" className="mt-4 mr-4" onClick={handleCancel}>
        Cancel
      </Button>
      <Button className="mt-4" onClick={handleSubmit}>
        {budgetEntry?.id ? "Update" : "Save"}
      </Button>
    </>
  );
};
