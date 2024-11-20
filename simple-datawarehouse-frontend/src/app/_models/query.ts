export interface Query {
  columns: Column[];
  fromTable: string;
  joins: Join[];
  groupByList: string[];
  havingList: Having[];
  orderByList: OrderBy[];
  whereList: Where[];
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

export interface Where {
  columnName: string;
  operator: string;
  value: string;
}

export interface Having {
  columnName: string;
  operator: string;
  value: string;
}
