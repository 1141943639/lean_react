export interface Item {
  id: string;
  title: string;
}

export type List = Array<Item>;
export type SetList = (data: List) => void;
