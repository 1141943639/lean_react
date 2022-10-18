import React, { useState, useEffect, useCallback } from 'react';
import { cloneDeep } from 'lodash';
import List from './components/List';
import AddInput from './components/AddInput';
import { Item as ItemInterFace, List as ListInterface } from './interface/index';
import { useAppSelector } from 'hooks/useAppState';
import { selectUser } from 'store/slice/auth';
import {
  useGetByUserIdMutation,
  useUpdateMutation,
  useAddMutation,
  useDeleteMutation,
} from 'store/api/todos';
import useRelyGlobalLoading from 'hooks/useRelyGlobalLoading';

export default function Home() {
  // const { list } = useAppSelector(selectTodoList);
  const [list, setList] = useState([] as ListInterface);
  const { user } = useAppSelector(selectUser);

  const [getByUserId, { isLoading: getByUserIdLoading }] = useGetByUserIdMutation();
  const [add, { isLoading: addLoading }] = useAddMutation();
  const [update, { isLoading: updateLoading }] = useUpdateMutation();
  const [deleteItem, { isLoading: deleteLoading }] = useDeleteMutation();

  useRelyGlobalLoading([getByUserIdLoading, addLoading, updateLoading, deleteLoading]);

  const handleSetList = useCallback(
    async (data: ItemInterFace, value: string, index: number) => {
      data = cloneDeep(data);
      if (data.title === value) return;
      data.title = value;
      await update(data);
      list.splice(index, 1, data);
      setList([...list]);
    },
    [list, update]
  );

  const handleAdd = useCallback(
    async (data: ItemInterFace) => {
      await add(data);
      setList([data, ...list]);
    },
    [list, add]
  );

  const handleDeleteItem = useCallback(
    async (data: ItemInterFace, index: number) => {
      await deleteItem(data.id);
      list.splice(index, 1);
      setList([...list]);
    },
    [list, deleteItem]
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
  }, [user.id, getByUserId]);

  return (
    <div className="h-full flex flex-col">
      <AddInput onAdd={handleAdd} />
      <List list={list} onChangeList={handleSetList} onDeleteItem={handleDeleteItem} />
    </div>
  );
}
