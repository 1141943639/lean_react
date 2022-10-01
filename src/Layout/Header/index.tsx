import React from "react";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div>
      <select onChange={(e) => i18n.changeLanguage(e.currentTarget.value)}>
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>
    </div>
  );
};

export default Header;
