import { FC, useState } from "react";

import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Event } from "@/types/Event";
import { Button } from "@/components/ui/button";
import { useCreateEventMutation, useUpdateEventMutation } from "./events.api";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

type UpsertEventFormProps = {
  event?: Event;
};

export const UpsertEventForm: FC<UpsertEventFormProps> = ({ event }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: createEvent } = useCreateEventMutation();
  const { mutate: updateEvent } = useUpdateEventMutation(event?.id ?? 0);
  const [formData, setFormData] = useState<Event>(
    event || {
      name: "",
      spouseOne: "",
      spouseOneType: undefined,
      spouseTwo: "",
      spouseTwoType: undefined,
      date: new Date(),
      location: "",
      description: "",
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    navigate("/events");
  };

  const handleSubmit = () => {
    const mappedDate = formData.date?.toISOString().split("T")[0];
    if (event?.id) {
      updateEvent({ id: event.id, ...formData, date: mappedDate });
    } else {
      createEvent({ ...formData, date: mappedDate });
    }
    navigate("/events");
  };

  return (
    <>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
        {event?.id ? t("modifyEvent") : t("createEvent")}
      </h2>

      <div className="grid w-full max-w-lg items-center gap-1.5">
        <Label htmlFor="name">{t("name")}</Label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder={t("eventNamePlaceholder")}
          className="mb-4"
        />
      </div>
      {/* Spouses */}
      <div className="flex w-full max-w-lg items-center gap-4 my-4">
        <div className="w-1/2">
          <Label htmlFor="spouseOne">{t("firstSpouse")}</Label>
          <Input
            name="spouseOne"
            value={formData.spouseOne}
            onChange={handleInputChange}
            placeholder={t("spousePlaceholder")}
          />
        </div>
        <div className="w-1/2">
          <Label htmlFor="spouseOneType">{t("weddingRole")}</Label>
          <Select
            defaultValue={formData.spouseOneType}
            onValueChange={(v: string) =>
              handleSelectChange("spouseOneType", v)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="bride">{t("roleBride")}</SelectItem>
                <SelectItem value="groom">{t("roleGroom")}</SelectItem>
                <SelectItem value="partner">{t("rolePartner")}</SelectItem>
                <SelectItem value="other">{t("roleOther")}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex w-full max-w-lg items-center gap-4 my-4">
        <div className="w-1/2">
          <Label htmlFor="spouseTwo">{t("secondSpouse")}</Label>
          <Input
            name="spouseTwo"
            value={formData.spouseTwo}
            onChange={handleInputChange}
            placeholder="John Doe"
          />
        </div>
        <div className="w-1/2">
          <Label htmlFor="spouseTwoType">{t("weddingRole")}</Label>
          <Select
            defaultValue={formData.spouseTwoType}
            onValueChange={(v: string) =>
              handleSelectChange("spouseTwoType", v)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="bride">{t("roleBride")}</SelectItem>
                <SelectItem value="groom">{t("roleGroom")}</SelectItem>
                <SelectItem value="partner">{t("rolePartner")}</SelectItem>
                <SelectItem value="other">{t("roleOther")}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Details */}
      <div className="grid w-full max-w-lg items-center gap-1.5">
        <Label htmlFor="date">{t("date")}</Label>
        <Input
          name="date"
          value={formData.date?.toISOString().split("T")[0]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, date: new Date(e.target.value) })
          }
          type="date"
          className="mb-4"
        />
      </div>
      <div className="grid w-full max-w-lg items-center gap-1.5">
        <Label htmlFor="location">{t("location")}</Label>
        <Input
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder={t("locationPlaceholder")}
          className="mb-4"
        />
      </div>

      <Button variant="secondary" className="mt-4 mr-4" onClick={handleCancel}>
        {t("cancel")}
      </Button>
      <Button className="mt-4" onClick={handleSubmit}>
        {event?.id ? t("modify") : t("create")}
      </Button>
    </>
  );
};
