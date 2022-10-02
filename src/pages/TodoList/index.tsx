import React, { useState, useEffect, useCallback } from "react";
import { setTodoList, selectLanguage } from "slice/todoList";
import { useAppDispatch, useAppSelector } from "hooks";

import List from "./components/List";
import AddInput from "./components/AddInput";

import {
  Item as ItemInterFace,
  List as ListInterface,
} from "./interface/index";

export default function Home() {
  const { list } = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();

  const setList = useCallback(
    (data: ListInterface) => {
      dispatch(setTodoList([...data]));
    },
    [list]
  );

  const handleAdd = useCallback(
    (data: ItemInterFace) => {
      dispatch(setTodoList([...list, data]));
    },
    [list]
  );

  return (
    <div>
      <AddInput onAdd={handleAdd} />
      <List list={list} onChangeList={setList} />
    </div>
  );
}
