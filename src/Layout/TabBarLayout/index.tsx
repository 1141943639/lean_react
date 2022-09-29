import React from "react";
import { Route, useHistory, useLocation } from "react-router-dom";

import Tab from "components/Tab";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";

export interface TabInterface {
  path: string;
  component: React.ReactNode;
  name: string;
}

type TabList = Array<TabInterface>;

interface IProps {
  tabList: TabList;
  defaultValue?: any;
}

const TabBarLayout: React.FC<IProps> = (props) => {
  const { tabList = [] as TabList } = props || ({} as IProps);
  const defaultValue = props.defaultValue || tabList?.[0]?.name;
  const history = useHistory();

  const handleClickTab = (item: TabInterface) => {
    history.push(item.path);
  };

  return (
    <TabsUnstyled defaultValue={defaultValue}>
      {tabList.map((item: TabInterface) => item.component)}

      <TabsListUnstyled>
        {tabList.map((item: TabInterface) => (
          <Tab onClick={() => handleClickTab(item)} key={item.path}>
            <div>{item.name}</div>
          </Tab>
        ))}
      </TabsListUnstyled>
    </TabsUnstyled>
  );
};

export default TabBarLayout;
