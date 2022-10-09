import React, { useState, MouseEvent, KeyboardEvent } from "react";

import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";

import { Item as ItemInterFace } from "../interface/index";

interface IProps {
  onAdd: (data: ItemInterFace) => void;
}

const ENTER_KEY = "Enter";

const AddInput: React.FC<IProps> = (props) => {
  const [addInput, setAddInput] = useState("");
  const { t } = useTranslation();

  const handleInput = (e: MouseEvent<HTMLInputElement>) => {
    setAddInput(e.currentTarget.value);
  };

  const handleClick = () => {
    if (!addInput) return;

    props.onAdd({
      id: uuid(),
      title: addInput,
    });

    setAddInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (ENTER_KEY === e.key) {
      handleClick();
    }
  };

  return (
    <div className="flex mb-2 flex-shrink-0 justify-center h-10 px-3 w-full">
      <div className="border-2 border-r-0 w-full rounded-r-none rounded-md flex justify-center items-center">
        <input
          className="w-full focus-visible:outline-none px-2"
          onKeyDown={handleKeyDown}
          value={addInput}
          onInput={handleInput}
        />
      </div>
      <button
        className="w-16 bg-blue-400 text-white rounded-l-none rounded-md"
        onClick={handleClick}
      >
        {t("todoList.addBtn")}
      </button>
    </div>
  );
};

export default AddInput;
