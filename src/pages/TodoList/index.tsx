import React, { useState, useEffect, useCallback } from "react";
import { setTodoList, selectTodoList } from "slice/todoList";
import { useAppDispatch, useAppSelector } from "hooks";
import { selectUser } from "slice/auth";
import {
  useGetByUserIdMutation,
  useUpdateMutation,
  useAddMutation,
  useDeleteMutation,
} from "api/todos";

import List from "./components/List";
import AddInput from "./components/AddInput";

import {
  Item as ItemInterFace,
  List as ListInterface,
} from "./interface/index";
import { clone, cloneDeep } from "lodash";

export default function Home() {
  // const { list } = useAppSelector(selectTodoList);
  const [list, setList] = useState([] as ListInterface);
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [getByUserId] = useGetByUserIdMutation();
  const [add] = useAddMutation();
  const [update] = useUpdateMutation();
  const [deleteItem] = useDeleteMutation();

  const handleSetList = useCallback(
    async (data: ItemInterFace, value: string, index: number) => {
      data = cloneDeep(data);
      data.title = value;
      await update(data);
      list.splice(index, 1, data);
      setList([...list]);
    },
    [list]
  );

  const handleAdd = useCallback(
    async (data: ItemInterFace) => {
      await add(data);
      list.unshift(data);
      setList(list);
    },
    [list]
  );

  const handleDeleteItem = useCallback(
    async (data: ItemInterFace, index: number) => {
      await deleteItem(data.id);
      list.splice(index, 1);
      setList([...list]);
    },
    [list]
  );

  useEffect(() => {
    let ignore = false;

    (async () => {
      const { data } = (await getByUserId(user.id)) as { data: ListInterface };
      if (ignore) return;
      setList(cloneDeep(data));
    })();

    return () => {
      ignore = true;
    };
  }, [user.id]);

  return (
    <div className="h-full flex flex-col">
      <AddInput onAdd={handleAdd} />
      <List
        list={list}
        onChangeList={handleSetList}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}
