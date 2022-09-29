import React, { useState } from "react";

import Item from "./Item";

import {
  List as ListInterface,
  Item as ItemInterFace,
} from "../interface/index";

interface IProps {
  list: ListInterface;
  onChangeList: (list: ListInterface) => void;
}

const List: React.FC<IProps> = (props) => {
  const { list = [] as ListInterface } = props || ({} as IProps);

  const handleChangeValue = (value: string, index: number) => {
    const data = list?.[index];

    if (!data) return;

    data.value = value;

    props.onChangeList?.([...list]);
  };

  const handleDeleteItem = (index: number) => {
    list.splice(index, 1);
    props.onChangeList?.([...list]);
  };

  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <li key={item.id}>
            <Item
              data={item}
              onChangeValue={(value, ...arg) =>
                handleChangeValue(value, index, ...arg)
              }
              onDelete={() => handleDeleteItem(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
