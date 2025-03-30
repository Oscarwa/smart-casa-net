import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Budget } from "@/types/Budget";
import { Label } from "@radix-ui/react-label";
import { useNavigate, useParams } from "react-router";
import { useCreateBudgetMutation, useUpdateBudgetMutation } from "./budget.api";

type UpsertBudgetFormProps = {
  budget?: Budget;
};

export const UpsertBudgetForm: FC<UpsertBudgetFormProps> = ({ budget }) => {
  const { t } = useTranslation();
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { mutate: createBudget } = useCreateBudgetMutation(Number(eventId));
  const { mutate: updateBudget } = useUpdateBudgetMutation(
    budget?.id ?? 0,
    Number(eventId)
  );
  const [formData, setFormData] = useState<Budget>(
    budget || { description: "" }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let _value: string | number = value;
    if (["guestCount", "desiredBudget"].includes(name)) {
      _value = Number(value);
    }
    setFormData({ ...formData, [name]: _value });
  };

  const handleCancel = () => {
    navigate(`/events/${eventId}/budgets`);
  };

  const handleSubmit = () => {
    if (budget?.id) {
      updateBudget({ id: budget.id, ...formData });
    } else {
      createBudget(formData);
    }
    navigate(`/events/${eventId}/budgets`);
  };
  return (
    <>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
        {budget?.id ? t("modifyBudget") : t("createBudget")}
      </h2>

      <div className="grid w-full max-w-lg items-center gap-1.5">
        <Label htmlFor="description">Name</Label>
        <Input
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Petite proposal"
          className="mb-4"
        />
      </div>
      <div className="grid w-full max-w-lg items-center gap-1.5">
        <Label htmlFor="guestCount">{t("guestCount")}</Label>
        <Input
          name="guestCount"
          type="number"
          value={formData.guestCount ?? ""}
          onChange={handleInputChange}
          placeholder={t("guestCountPlaceholder")}
          className="mb-4"
        />
      </div>
      <div className="grid w-full max-w-lg items-center gap-1.5">
        <Label htmlFor="destination">{t("destination")}</Label>
        <Input
          name="destination"
          value={formData.destination}
          onChange={handleInputChange}
          placeholder={t("destinationPlaceholder")}
          className="mb-4"
        />
      </div>
      <div className="grid w-full max-w-lg items-center gap-1.5">
        <Label htmlFor="desiredBudget">{t("budget")}</Label>
        <Input
          name="desiredBudget"
          type="number"
          value={formData.desiredBudget}
          onChange={handleInputChange}
          placeholder={t("amountPlaceholder")}
          className="mb-4"
        />
      </div>

      <Button variant="secondary" className="mt-4 mr-4" onClick={handleCancel}>
        {t("cancel")}
      </Button>
      <Button className="mt-4" onClick={handleSubmit}>
        {budget?.id ? t("modify") : t("create")}
      </Button>
    </>
  );
};
