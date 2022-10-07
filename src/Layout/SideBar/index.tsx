import React, { forwardRef, useState } from "react";
import { Route, useHistory, useLocation, Switch } from "react-router-dom";

import Tab from "components/Tab";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import { isEmpty } from "lodash";

export interface TabInterface {
  path: string;
  name: string | React.ReactNode | React.ReactElement;
  svg?: React.ReactNode | React.ReactElement | undefined;
}

type TabList = Array<TabInterface>;

interface IProps {
  tabList: TabList;
  defaultValue?: any;
  onClickTab?: () => void;
}

const SideBar = (props: IProps, ref: React.Ref<HTMLDivElement>) => {
  const { tabList = [] as TabList } = props || ({} as IProps);
  const defaultValue = props.defaultValue || tabList?.[0]?.path;
  const history = useHistory();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState({} as TabInterface);

  const handleClickTab = (item: TabInterface) => {
    history.push(item.path);
    setActiveTab(item);
    props.onClickTab?.();
  };

  const checkIsActive = (item: TabInterface) => {
    const activeTabPath = location.pathname;

    return item.path === activeTabPath
      ? "text-blue-500 bg-green-50"
      : "text-gray-500";
  };

  return (
    <TabsUnstyled
      ref={ref}
      className="bg-white flex-shrink-0 h-full w-full p-3"
    >
      <TabsListUnstyled className="flex flex-col justify-around">
        {tabList.map((item: TabInterface) => (
          <Tab
            onClick={() => handleClickTab(item)}
            key={item.path}
            className={[
              "flex p-2 rounded-md w-full items-center h-full fill-current",
              checkIsActive(item),
            ]
              .filter((val) => val)
              .join(" ")}
          >
            {item.svg && <div className="mr-1">{item.svg}</div>}
            <div className="overflow-ellipsis whitespace-nowrap overflow-hidden flex-1 text-left">
              {item.name}
            </div>
          </Tab>
        ))}
      </TabsListUnstyled>
    </TabsUnstyled>
  );
};

export default forwardRef(SideBar);
