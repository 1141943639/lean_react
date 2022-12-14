import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SelectUnstyled from '@mui/base/SelectUnstyled';
import OptionUnstyled from '@mui/base/OptionUnstyled';
import { selectLanguage, setLanguage } from 'store/slice/language';
import { useAppDispatch, useAppSelector } from 'hooks/useAppState';

import Drawer from 'components/Drawer';
import SideBar, { TabInterface } from 'Layout/SideBar/index';
import MoreSvg from 'icons/svg/MoreSvg';

interface Option {
  name: string;
  value: string;
}

interface Props {
  onOpenDrawer: () => void;
}

const Header: React.FC<Props> = (props) => {
  const { i18n, t } = useTranslation();
  const { language } = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();
  const { onOpenDrawer } = props;

  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const optionArr: Array<Option> = [
    {
      value: 'en',
      name: 'English',
    },
    {
      value: 'zh',
      name: '中文(简体)',
    },
    {
      value: 'tzh',
      name: '中文(繁体)',
    },
  ];

  const getClassName = (item: Option) => {
    return item.value === language ? 'bg-blue-100' : '';
  };

  return (
    <div className="flex justify-between">
      <div>
        <button className="md:hidden block" onClick={() => onOpenDrawer?.()}>
          <MoreSvg className="w-4 h-4" />
        </button>
      </div>

      <div>
        <span>{t('header.text')}: </span>
        <SelectUnstyled
          className="focus-visible:outline-none px-2 border rounded-md"
          value={language}
          onChange={(e, newValue) => {
            dispatch(setLanguage(newValue as string));
          }}
          componentsProps={{
            listbox: {
              className: 'p-2 bg-gray-50',
            },
            popper: {
              className: 'z-10',
            },
          }}
        >
          {optionArr.map((item) => (
            <OptionUnstyled
              className={['cursor-pointer p-1 hover:bg-green-150', getClassName(item)].join(' ')}
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
