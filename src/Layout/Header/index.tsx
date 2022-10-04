import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { selectLanguage, setLanguage } from "slice/language";
import { useAppDispatch, useAppSelector } from "hooks";

import SelectUnstyled from "@mui/base/SelectUnstyled";
import OptionUnstyled from "@mui/base/OptionUnstyled";
import Drawer from "components/Drawer";

interface Option {
  name: string;
  value: string;
}

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const { language } = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);

  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const optionArr: Array<Option> = [
    {
      value: "en",
      name: "English",
    },
    {
      value: "zh",
      name: "中文",
    },
  ];

  const getClassName = (item: Option) => {
    return item.value === language ? "bg-blue-100" : "";
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <div className="flex justify-between">
      <div>
        <button onClick={() => setOpenDrawer(true)}>抽屉</button>
        <Drawer onClose={handleCloseDrawer} open={openDrawer}>
          <div>125125</div>
        </Drawer>
      </div>

      <div>
        <span>语言: </span>
        <SelectUnstyled
          className="focus-visible:outline-none px-2 border rounded-md"
          value={language}
          onChange={(e, newValue) => {
            dispatch(setLanguage(newValue as string));
          }}
          componentsProps={{
            listbox: {
              className: "p-2 bg-gray-50",
            },
          }}
        >
          {optionArr.map((item) => (
            <OptionUnstyled
              className={[
                "cursor-pointer p-1 hover:bg-green-150",
                getClassName(item),
              ].join(" ")}
              key={item.value}
              value={item.value}
            >
              {item.name}
            </OptionUnstyled>
          ))}
        </SelectUnstyled>
      </div>
    </div>
  );
};

export default Header;
