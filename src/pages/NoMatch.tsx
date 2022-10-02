import React from "react";
import { useTranslation } from "react-i18next";

const NoMatch = () => {
  const { t } = useTranslation();

  return <div>{t("noMatch")}</div>;
};

export default NoMatch;
