import React, { useState, useEffect, FormEvent, KeyboardEvent } from "react";

import { Item as ItemInterface } from "pages/TodoList/interface/index";

interface IProps {
  data: ItemInterface;
  onChangeValue?: (value: string) => void;
  onDelete?: () => void;
}

const Item: React.FC<IProps> = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  const { data = {} as ItemInterface } = props || {};

  const handleClickEdit = () => {
    setIsEdit(true);
    setEditValue(data.value);
  };

  const handleClickDelete = () => {
    props.onDelete?.();
  };

  const handleInputEditValue = (e: FormEvent<HTMLInputElement>) => {
    setEditValue(e.currentTarget.value);
  };

  const handleEditKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      props.onChangeValue?.(editValue);
      setIsEdit(false);
    }
  };

  return (
    <div>
      {isEdit ? (
        <input
          onKeyDown={handleEditKeyDown}
          value={editValue}
          onInput={handleInputEditValue}
        />
      ) : (
        <div>{data.value}</div>
      )}

      <div>
        <button onClick={handleClickEdit}>编辑</button>
        <button onClick={handleClickDelete}>删除</button>
      </div>
    </div>
  );
};

export default Item;