import React, { useState, useEffect, useCallback } from "react";

import List from "./components/List";
import AddInput from "./components/AddInput";

import {
  Item as ItemInterFace,
  List as ListInterface,
} from "./interface/index";

export default function Home() {
  const [list, setList] = useState([] as ListInterface);

  const handleAdd = useCallback(
    (data: ItemInterFace) => {
      setList([...list, data]);
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
