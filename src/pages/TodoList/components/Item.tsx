import React, {
  useState,
  useEffect,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useMemo,
} from "react";

import { useTranslation } from "react-i18next";

import { Item as ItemInterface } from "pages/TodoList/interface/index";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { v4 as uuid } from "uuid";

interface IProps {
  data: ItemInterface;
  onChangeValue?: (value: string) => void;
  onDelete?: () => void;
}

const Item: React.FC<IProps> = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  const { data = {} as ItemInterface } = props || {};
  const { t } = useTranslation();
  const inputRef: React.RefObject<HTMLTextAreaElement> = React.useRef(null);
  const viewRef: React.RefObject<HTMLDivElement> = React.useRef(null);
  const [needFocus, setNeedFocus] = React.useState(false);
  const titleArr = useMemo(() => {
    return data.title.split("\n").map((str) => ({
      value: str,
      _id: uuid(),
    }));
  }, [data.title]);

  const handleClickEdit = () => {
    setIsEdit(true);
    setEditValue(data.title);
    setNeedFocus(true);
  };

  const handleClickDelete = () => {
    props.onDelete?.();
  };

  const handleInputEditValue = (e: FormEvent<HTMLTextAreaElement>) => {
    setEditValue(e.currentTarget.value);
  };

  const handleWindowClick = (e: any) => {
    if (!inputRef?.current) return;

    const target = e.target;

    if (!inputRef.current.contains(target)) {
      changeValue();
    }
  };

  useEffect(() => {
    if (needFocus) {
      const valueLen = data.title?.length || 0;

      inputRef?.current?.focus?.();
      inputRef?.current?.setSelectionRange(valueLen, valueLen);

      setNeedFocus(false);
    }
  }, [needFocus]);

  useEffect(() => {
    if (!isEdit) {
      window.removeEventListener("click", handleWindowClick);
    } else {
      setTimeout(() => {
        window.addEventListener("click", handleWindowClick);
      });
    }

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [isEdit]);

  const changeValue = (value: string = inputRef?.current?.value || "") => {
    props.onChangeValue?.(value);
    setIsEdit(false);
  };

  return (
    <div className="flex justify-between p-3 flex items-center bg-blue-50 mb-3 rounded-md shadow-md">
      {isEdit ? (
        <TextareaAutosize
          ref={inputRef}
          value={editValue}
          onInput={handleInputEditValue}
          className="focus-visible:outline-none w-full"
        />
      ) : (
        <div ref={viewRef} className="">
          {titleArr.map(({ value, _id }, index) => (
            <span key={_id}>
              {value}
              {titleArr.length > 0 && <br />}
            </span>
          ))}
        </div>
      )}

      <div className="flex-shrink-0 flex justify-center ml-3">
        <button
          className="mr-2 rounded-md border bg-green-500 text-white px-3 py-1"
          onClick={handleClickEdit}
        >
          {t("todoList.editBtn")}
        </button>
        <button
          className="rounded-md border bg-red-500 text-white px-3 py-1"
          onClick={handleClickDelete}
        >
          {t("todoList.delBtn")}
        </button>
      </div>
    </div>
  );
};

export default Item;
