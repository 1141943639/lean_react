export interface Item {
  id: string;
  value: string;
}

export type List = Array<Item>;
export type SetList = (data: List) => void;
