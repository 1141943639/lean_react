import React, { useState, MouseEvent, KeyboardEvent } from "react";

import { v4 as uuid } from "uuid";

import { Item as ItemInterFace } from "../interface/index";

interface IProps {
  onAdd: (data: ItemInterFace) => void;
}

const ENTER_KEY = "Enter";

const AddInput: React.FC<IProps> = (props) => {
  const [addInput, setAddInput] = useState("");

  const handleInput = (e: MouseEvent<HTMLInputElement>) => {
    setAddInput(e.currentTarget.value);
  };

  const handleClick = () => {
    if (!addInput) return;

    props.onAdd({
      id: uuid(),
      value: addInput,
    });

    setAddInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (ENTER_KEY === e.key) {
      handleClick();
    }
  };

  return (
    <div>
      <input onKeyDown={handleKeyDown} value={addInput} onInput={handleInput} />
      <button onClick={handleClick}>添加</button>
    </div>
  );
};

export default AddInput;
