export interface Query {
  columns: Column[];
  fromTable: string;
  joins: Join[];
  groupByList: string[];
  havingList: Condition[];
  orderByList: OrderBy[];
}

export interface Column {
  name: string;
  alias: string;
  function: string;
}

export interface Join {
  type: string;
  table: string;
  conditions: Condition[];
}

export interface Condition {
  leftOperand: string;
  operator: string;
  rightOperand: string;
}

export interface OrderBy {
  columnName: string;
  ascending: boolean;
}
