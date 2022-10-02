import React from "react";
import { useTranslation } from "react-i18next";
import { selectLanguage, setLanguage } from "slice/language";
import { useAppDispatch, useAppSelector } from "hooks";

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const { language } = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <div>
      <select
        value={language}
        onChange={(e) => {
          const value = e.currentTarget.value;
          dispatch(setLanguage(value));
        }}
      >
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>
    </div>
  );
};

export default Header;
