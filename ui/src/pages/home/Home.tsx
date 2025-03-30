import { FC } from "react";
import { useTranslation } from "react-i18next";

export const Home: FC = () => {
  const { t } = useTranslation();

  return <section>{t("home")}</section>;
};
