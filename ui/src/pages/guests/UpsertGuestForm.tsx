import { FC, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateGuestMutation, useUpdateGuestMutation } from "./guests.api";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Guest } from "@/types/Guest";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

type UpsertGuestFormProps = {
  guest: Guest | null;
  selectGuest: (guest: Guest | null) => void;
};

export const UpsertGuestForm: FC<UpsertGuestFormProps> = ({
  guest,
  selectGuest,
}) => {
  const { t } = useTranslation();
  const { eventId } = useParams();
  const { mutate: createGuest } = useCreateGuestMutation(Number(eventId));
  const { mutate: updateGuest } = useUpdateGuestMutation(
    guest ? guest.id! : 0,
    Number(eventId)
  );
  const [formData, setFormData] = useState<Guest>(
    guest ?? { firstName: "", lastName: "", phone: "" }
  );

  useEffect(() => {
    if (guest) {
      setFormData(guest);
    }
  }, [guest]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearForm = () => {
    setFormData({ firstName: "", lastName: "", phone: "" });
    selectGuest(null);
  };

  const handleCancel = () => {
    clearForm();
  };

  const handleSubmit = () => {
    if (guest?.id) {
      updateGuest({ ...formData });
    } else {
      createGuest({ ...formData });
    }
    clearForm();
  };

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            <span>{guest?.id ? t("modifyGuest") : t("createGuest")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <Label htmlFor="firstName">{t("name")}</Label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="lastName">{t("name")}</Label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="ml-auto">
            <Button variant="secondary" className="mr-4" onClick={handleCancel}>
              {t("cancel")}
            </Button>
            <Button onClick={handleSubmit}>
              {guest?.id ? t("modify") : t("create")}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
