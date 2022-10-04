import React, { useState } from "react";

import Item from "./Item";

import {
  List as ListInterface,
  Item as ItemInterFace,
} from "../interface/index";

interface IProps {
  list: ListInterface;
  onChangeList?: (
    editItem: ItemInterFace,
    value: string,
    index: number,
    list: ListInterface
  ) => void;
  onDeleteItem?: (
    item: ItemInterFace,
    index: number,
    list: ListInterface
  ) => void;
}

const List: React.FC<IProps> = (props) => {
  const { list = [] as ListInterface } = props || ({} as IProps);

  const handleChangeValue = (value: string, index: number) => {
    const data = list?.[index];

    if (!data) return;

    props.onChangeList?.(data, value, index, list);
  };

  const handleDeleteItem = (index: number) => {
    props.onDeleteItem?.(list[index], index, list);
  };

  return (
    <div className="overflow-y-auto flex-1 p-3">
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
